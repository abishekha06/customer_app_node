const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars');
const { json } = require("body-parser");
// const { log } = require("console");




const providerRegistration = async(req,res)=>{
    try{
        const{name,email,mobile,type,vehicle,documents,gst,password,photo,engine_no,chassis_no,owner_name,model_no}=req.body;

        if(!mobile){
            return res.status(400).json({
                error:true,
                success:false,
                message:"mobile number is required"

            })
        }
    const emailRegex = /^[^\s@]+@gmail\.com$/;
      if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: true,
       status: false,
       message: "Invalid email format",
      });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      auth: {
        user: "support@chaavie.com",
        pass: "GWExAA8yGEnC",
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    });
    
  
  const randomPassword = generateRandomPassword(10); // Generate a random password of length 10
  console.log(randomPassword);
  
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
    };
    transporter.use("compile", hbs(handlebarOptions));


    function generateRandomPassword(length) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let passwords = "";
      
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          passwords += charset.charAt(randomIndex);
      }
      
      return passwords;
  }
  let mailOptions = {
    from: "support@chaavie.com", // sender address
    to: email,
    subject: "OTP Mail", // Subject line
    template: "user_temp_otp",
    context: {
        name: name,
        password: randomPassword
    },
};
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return console.log(err);
      }
      console.log("Message info",info)
      console.log("password",randomPassword)
     
    });
    const hashedpassword = await bcrypt.hash(randomPassword, 10);
    await prisma.provider_details.create({
        data:{
            name:name,
            email:email,
            mobile:mobile,
            type:type,
            vehicle:vehicle,
            documents:documents,
            gst:gst,
            password:hashedpassword,
            photo:photo,
            engine_no:engine_no,
            chassis_no:chassis_no,
            owner_name:owner_name,
            model_no:model_no
        }
    })
return res.status(200).json({
    message:"successfully registered"
})
        }catch(err){
        console.error("err==",err)
    }
}

const provider_login = async (req, res) => {
    const { userid , password } = req.body;

    if (!userid || !password) {
        res.status(401).json({
            error: true,
            status: false,
            message: "Email/Mobile and password are required"
        });
    } else {
        try {
            let user;
            let identifier;

            const emailFormat = /^[^\s@]+@gmail\.com$/.test(userid);
            if(emailFormat){
              identifier = "email";
            }else{
              identifier = "mobile";
            }

            if(identifier === "email"){
              user=await prisma.provider_details.findFirst({
                where:{
                  email:userid
                }
              })
            }else{
              user=await prisma.provider_details.findFirst({
                where:{
                  mobile:userid
                }
              })
            }
         console.log(user);

            if (!user) {
                res.status(401).json({
                    error: true,
                    status: false,
                    message: "User not found"
                });
            } else {
                const hashedPassword = user.password;

                console.log(user.password);

                bcrypt.compare(password, hashedPassword, function (err, result) {
                    if (err) {
                        res.status(500).json({
                            error: true,
                            status: false,
                            message: "Password hashing error"
                        });
                    } else {
                        if (!result) {
                            res.status(401).json({
                                error: true,
                                status: false,
                                message: "Invalid password"
                            });
                        } else {
                            res.status(200).json({
                                error: false,
                                status: true,
                                message: "Successfully logged in",
                                data:user
                            });
                        }
                    }
                });
            }
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({
                error: true,
                status: false,
                message: "Internal server error"
            });
        }
    }
};


//full customer details passing to driver
const customers_details =async(req,res)=>{
    try{
        const custmr_details = await prisma.order_details.findMany()
console.log("custmr_details",custmr_details);
res.status(200).json({
    error:false,
    success:true,
    data:custmr_details
})
    }catch(err){
        console.error("error==",err)
    }

}

//single customer order details
const single_order_detail = async(req,res)=>{
    const id = req.body.id
    try{
 
  const single_detail = await prisma.order_details.findUnique({
    where:{
       id:id
    }
  })
  console.log("single_details----",single_detail)
  res.status(200).json({
    error:false,
    success:true,
    message:"order details found",
    data:single_detail
  })

    }catch(err){
        console.error("error==",err)
    }
}

//adding price by driver to the single order detail

const amount_added = async (req, res) => {
    const { order_id, price, provider_id,status  } = req.body;
    try {
      const single_details = await prisma.order_details.findUnique({
        where: {
          id: order_id,
        }
       
      });
  
      if (!single_details) {
        res.status(400).json({
          error: true,
          success: false,
          message: "Order details not found",
        });
      } else {
        const provider_details = await prisma.provider_details.findUnique({
          where: {
            id: provider_id,
          },
        });
  
        if (!provider_details) {
          res.status(400).json({
            error: true,
            success: false,
            message: "Provider details not found",
          });
        } else {
          const amnt_adding = await prisma.provider_response.create({
            data: {
              orderdetail_id: {
                connect: {
                  id: order_id,
                },
              },
              providr_id: { 
                connect: {
                  id: provider_id,
                },
              },
              price: price,
            },
          });
          //status updating
          await prisma.order_details.update({
            where: {
                id: order_id,
            },
            data: {
                status: status, // Update the status field
               
            },
        });
  
          res.status(200).json({
            error: false,
            success: true,
            message: "Provider response added successfully",
            data: amnt_adding,
          });
        }
      }
    } catch (err) {
      console.error("err----", err);
      res.status(500).json({
        error: true,
        success: false,
        message: "Internal server error",
      });
    }
  };


 //for adding documents
 const driver_documentation =async(req,res)=>{
  const{id,documents}=req.body
  try{
    const verification = await prisma.provider_details.update({
      where:{
        id:id
      },
      data:{
     
       documents:documents,
      
      }
    })
    res.status(200).json({
      error:false,
      success:true,
      message:'documents added successfully',
      data:verification,
    })


  }catch(err){
    console.error("error==",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"an error occured during uploading the documents"
    })
  }
  
}   






const provider_feedback= async(req,res)=>{
  console.log("reqq",req.body);
  const provider_id =parseInt(req.body.provider_id)
  const param1=req.body.param1
  const param2=req.body.param2
  const param3=req.body.param3
  const param4=req.body.param4
  const remarks=req.body.remarks
  try{
    const feedback = await prisma.provider_details.findUnique({
      where:{
          id:provider_id
      }
      })
     if(!feedback){
      res.status(500).json({
          error:true,
          success:false,
          message:"provider not found"
      })
     }
     const provider_fedback = await prisma.provider_feedback.create({
      data:{
          provider_id:provider_id,
          param1:param1,
          param2:param2,
          param3:param3,
          param4:param4,
          remarks:remarks
      }

     })
     const allfeedback = await prisma.provider_feedback.findMany({
      where:{
        provider_id:provider_id
      }
     })
  
     const numFeedback = allfeedback.length;
     let totalAverage = 0;
     for (const feedback of allfeedback) {
         totalAverage += (feedback.param1 + feedback.param2 + feedback.param3 + feedback.param4) / 4;
     }
     const newaverage = totalAverage / numFeedback;
     const roundedAverage = parseFloat(newaverage.toFixed(1));

   console.log("allfeedback===",allfeedback)

   await prisma.provider_feedback.updateMany({
    where:{
      provider_id:provider_id
    },
    data:{
      average:roundedAverage
    }
   })

   await prisma.provider_details.update({
    where:{
      id:provider_id
    },
    data:{
      provider_feedback:roundedAverage
    }
   })

     console.log("cus_feedback",provider_fedback);
     res.status(200).json({
      message:"feebback added successfully",
      avaerage:roundedAverage
     })
 
  }catch(err){
   console.error("error====",err)
  }
}
  
//for creating new password
const changeing_password = async(req,res)=>{
  const {provider_id,newpassword} = req.body
  try{
    if(!newpassword || newpassword<8){
      res.status(400).json({
        error:true,
        success:false,
        message:"password must contain less than 8 characters"
      })
    }else{
      const hashedPassword = await bcrypt.hash(newpassword, 10)

      const new_password =await prisma.provider_details.update({
        where:{
          id:provider_id,

        },
        data:{
         password:hashedPassword
        }
      })
      res.status(200).json({
        error:false,
        success:true,
        message:"successfully changed the password",
        data:new_password
      })
    }
    

  }catch(err){
    console.error("error====",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"error"
    })
  }
}
  
//   const vehicle_detail_adding=async(req,res)=>{
//   try{
//     const{provider_id,chassis_no,engine_no,model_no,owner_name}=req.body
//     const details_adding= await prisma.provider_details.update({
//       where:{
//         id:provider_id
//       },
//       data:{
//         chassis_no:chassis_no,
//         engine_no:engine_no,
//         model_no:model_no,
//         owner_name:owner_name
//       }
//     })
//     console.log("details_adding",details_adding);
//     res.status(200).json({
//       error:false,
//       success:true,
//       message:"vehicle details added successfully",
//       data:details_adding
//     })

//   }catch(err){
//     console.error("err---",err)
//     res.status(400).json({
//       error:true,
//       success:false,
//       message:"an error happend in the code"
//     })
//   }
// }
//adding data to table vehicle in the database using the provider_id
// const vehicle_data = async(req,res)=>{
//   try{
//     const{provider_id,chassis_no,engine_no,owner_name,model_no}=req.body
//     const provider_detail = await prisma.provider_details.findUnique({
//       where:{
//         id:provider_id
//       }
//     })
//     if(!provider_detail){
//       res.status(400).json({
//         error:true,
//         success:false,
//         message:"customer not found"
//       })

//     }else{
//       const add_vehicle = await prisma.vehicle.create({
//         data:{
//           chassis_num:chassis_no,
//           engine_num:engine_no,
//           ownername:owner_name,
//           year_of_make:model_no,
//           provider_id:provider_id

//         }
//       })
//       console.log("add_vehicles====",add_vehicle)
//       res.status(200).json({
//         error:false,
//         success:true,
//         message:"details are successfully added to vehicle table",
//         data:add_vehicle
//       })
//     }

//   }catch(err){
//     console.error("err-----",err)
//     res.status(400).json({
//       error:true,
//       success:false,
//       message:"internal server error"
//     })
//   }

// }

//complete trip details of provider which is selected by customer

const complete_trip = async(req,res)=>{
  try{
    const{provider_id} = req.body

    const trip_details = await prisma.assignment.findMany({
      where:{
        provider_id:provider_id
      }
    })
    const complete_trip_details = []
    for(const trip of trip_details){
      const order_id = trip.order_id
      const order_details = await prisma.order_details.findUnique({
        where:{
          id:order_id
        }
      })
      if (order_details) {
        complete_trip_details.push({
            order_id: order_id,
            provider_id: trip.provider_id,
            bid_id: trip.bid_id,
            order_details: order_details,
        });
    }

    }


    res.status(200).json({
      error:false,
      success:true,
      message:"complete trip details are found",
      data:complete_trip_details
    })

  }catch(err){
    console.error("error-----",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"complete trip details are not found",

    })
  }
}

const vehicle_details = async(req,res)=>{
  try{
    const{provider_id,vehicle_no,photo,rc_book}=req.body
    const vehicle_data =await prisma.vehicle.create({
  
      data:{
        provider_id:provider_id,
        veh_num:vehicle_no,
        photo:photo,
        rc_book:rc_book
      }
    })
    res.status(200).json({
      error:false,
      success:true,
      messsage:"successfully added the details",
      data:vehicle_data
    })

  }catch(err){
    console.error("error----",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"details are not added"
    })
  }

}

//adding the above vehicle data to the vehicle table of the provider

const adding_veh_details = async(req,res)=>{
  try{
    const {provider_id} =req.body
    const getting_id =await prisma.vehicle.findMany({
      where:{
        provider_id:provider_id
      }
    })
 
    if(!getting_id){
      res.status(400).json({
        error:true,
        success:false,
        message:"details are listed",
       
      })
    }else{
      const getting_data = await prisma.provider_details.update({
        where:{
          id:provider_id
        },
        data:{
          vehicle:{
            connect: {connect: getting_id.map((vehicle) => ({ id: vehicle.id }))}
          }
        }

      })
      res.status(200).json({
        error:false,
        success:true,
        message:"vehicle data successfully added",
        data:getting_data
      })
     

    }
    
   

  }catch(err){
    console.error("err------",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"details are not found",
     
    })
  }
}

//status updating

const adding_status = async(req,res)=>{
  const {order_id, status} = req.body
  try{
    const status_update = await prisma.order_details.update({
      where:{
        id:order_id
      },
      data:{
        status:status
      }
    })
    res.status(200).json({
      error:false,
      success:true,
      message:"status updated",
      data:status_update
    })

  }catch(err){
    console.err("error---",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"internal server error"
    })
  }


}












module.exports= {providerRegistration,provider_login,customers_details,single_order_detail,amount_added,driver_documentation,provider_feedback,changeing_password,complete_trip,vehicle_details,adding_veh_details,adding_status}




