const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { restart } = require("nodemon");
const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars');
// const activeuserid = new set()





const registration = async (req, res) => {
    console.log("reqq", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const password = req.body.password;
    const type = req.body.type;
    const gst = req.body.gst;
  
    if (!mobile) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "mobile number is required",
      });
    }
  
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: true,
        status: false,
        message: "Invalid email format",
      });
    }
    //support mail
 
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
  
    try {
      // const hashedpassword = await bcrypt.hash(password, 10);
      const hashedpassword = await bcrypt.hash(randomPassword, 10);

      await prisma.customer_details.create({
        data: {
          name: name,
          email: email,
          address: address,
          password: hashedpassword,
          type: type,
          gst: gst,
          mobile: mobile,
        },
      });
      res.status(200).json({ message: "Registration successful!" });
    } catch (err) {
      console.error("err==", err);
      res.status(500).json({ error: "An error occurred during registration." });
    }
  };
  

// login 
// const logindata = async (req, res) => {
//     const { email, password, mobile } = req.body;

//     if ((!email && !mobile) || !password) {
//         res.status(401).json({
//             error: true,
//             status: false,
//             message: "Email/Mobile and password are required"
//         });
//     } else {
//         try {
//             let user;

//             if (email !== null && mobile !== null) {
              
//                 user = await prisma.customer_details.findFirst({
//                     where: {
//                         email: email,
//                         mobile: mobile
//                     },
//                 });
//             } else if (email !== null) {
                
//                 user = await prisma.customer_details.findFirst({
//                     where: {
//                         email: email
//                     },
//                 });
//             } else {
//                 // Check only for mobile if email is null
//                 user = await prisma.customer_details.findFirst({
//                     where: {
//                         mobile: mobile
//                     },
//                 });
//             }

//             console.log(user);

//             if (!user) {
//                 res.status(401).json({
//                     error: true,
//                     status: false,
//                     message: "User not found"
//                 });
//             } else {
//                 const hashedPassword = user.password;

//                 console.log(user.password);

//                 bcrypt.compare(password, hashedPassword, function (err, result) {
//                     if (err) {
//                         res.status(500).json({
//                             error: true,
//                             status: false,
//                             message: "Password hashing error"
//                         });
//                     } else {
//                         if (!result) {
//                             res.status(401).json({
//                                 error: true,
//                                 status: false,
//                                 message: "Invalid password"
//                             });
//                         } else {
//                             res.status(200).json({
//                                 error: false,
//                                 status: true,
//                                 message: "Successfully logged in",
//                                 data:user
//                             });
//                         }
//                     }
//                 });
//             }
//         } catch (err) {
//             console.error("Error:", err);
//             res.status(500).json({
//                 error: true,
//                 status: false,
//                 message: "Internal server error"
//             });
//         }
//     }
// };

const logindata = async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
      res.status(401).json({
          error: true,
          status: false,
          message: "Identifier and password are required"
      });
  } else {
      try {
          let user;
          let identifierType; 

          
          const isEmailFormat = /^[^\s@]+@gmail\.com$/.test(userid);

          if (isEmailFormat) {
              identifierType = 'email';
          } else {
              identifierType = 'mobile';
          }

          if (identifierType === 'email') {
              user = await prisma.customer_details.findFirst({
                  where: {
                      email: userid
                  },
              });
          } else {
              user = await prisma.customer_details.findFirst({
                  where: {
                      mobile: userid
                  },
              });
          }

          if (!user) {
              res.status(401).json({
                  error: true,
                  status: false,
                  message: "User not found"
              });
          } else {
              const hashedPassword = user.password;

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
                              data: user
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




//address book
const customer_addressbook = async (req, res) => {
    console.log("reqq",req.body);
    const custom_id = parseInt(req.body.custom_id);
  
    const{address,address_label,contact,category,district,locality,label,latitude,logitude}=req.body
    try {
        const cusaddress = await prisma.customer_details.findUnique({
            where: {
                id: custom_id
            }
            // select: {
            //     address: true
            // }
        });

        if (!cusaddress) {
            res.status(404).json({
                error: true,
                status: false,
                message: "Customer not found"
            });
        } else {
            // const address = cusaddress.address
            const saved_address = await prisma.address_book.create({
                data:{
                   custom_id :custom_id,
                   address:address,
                   address_label:address_label,
                   contact:contact,
                   category:category,
                   district:district,
                   locality:locality,
                   label:label,
                   logitude:logitude,
                   latitude:latitude
                }
            })
            console.log("saved_address",saved_address);
            res.status(200).json({
               data:saved_address
            });
        }
    } catch (err) {
        console.error("err==", err);
        res.status(500).json({
            error: true,
            status: false,
            message: "Internal server error"
        });
    }
};



//customer_feedback
const customer_feedback = async (req, res) => {
  const customer_id =parseInt(req.body.customer_id);
  const param1 = req.body.param1;
  const param2 = req.body.param2;
  const param3 = req.body.param3;
  const param4 = req.body.param4;
  const remark = req.body.remark;

  try {
      const feedback = await prisma.customer_details.findMany({
          where: {
              id: customer_id,
          },
      });

      if (!feedback) {
          res.status(500).json({
              error: true,
              success: false,
              message: "customer not found",
          });
      }

      const cust_feedback = await prisma.customer_feedback.create({
          data: {
              customer_id: customer_id,
              param1: param1,
              param2: param2,
              param3: param3,
              param4: param4,
              remark: remark,
          },
      });

      console.log("cus_feedback", cust_feedback);

      const all_feedback = await prisma.customer_feedback.findMany({
          where: {
              customer_id: customer_id,
          },
      });

      const numFeedback = all_feedback.length;
      let totalAverage = 0;

      for (const feedback of all_feedback) {
          totalAverage += (feedback.param1 + feedback.param2 + feedback.param3 + feedback.param4) / 4;
      }

      const newaverage = totalAverage / numFeedback;
      const roundedAverage = parseFloat(newaverage.toFixed(1));

      console.log("allfeedback===", all_feedback);

    
      await prisma.customer_feedback.updateMany({
          where: {
              customer_id: customer_id,
          },
          data: {
              average: roundedAverage,
          },
      });

      await prisma.customer_details.update({
        where:{
          id:customer_id
        },
        data:{
          feedback_average:roundedAverage
        }
      })

      res.status(200).json({
          message: "feedback added successfully",
          average: roundedAverage,
      });
  } catch (err) {
      console.error("err==", err);
      res.status(500).json({
          error: true,
          success: false,
          message: "Internal server error",
      });
  }
};
//product material list
const product_material = async (req, res) => {
    try {
      const materials_type = [
        { material_type: 'Clothing and Textiles', density: 150 },
        { material_type: 'Books and Paper Products', density: 300 },
        { material_type: 'Electronics and Appliances', density: 400 },
        { material_type: 'Wooden Furniture', density: 450 },
        { material_type: 'Metal Products', density: 700 },
        { material_type: 'Plastics and Rubber Products', density: 400 },
        { material_type: 'Food Products (Dry Foods)', density: 350 },
        { material_type: 'Glass Products', density: 2000 },
        { material_type: 'Liquids (Non-Hazardous)', density: 1000 },
        { material_type: 'Building Materials (Bricks)', density: 1750 },
        { material_type: 'Car Tires', density: 25 },
        { material_type: 'Car Body Panels (e.g., Bumpers, Fenders)', density: 75 },
        { material_type: 'Car Batteries', density: 300 },
        { material_type: 'Car Seats', density: 45 },
        { material_type: 'Car Spare Parts (e.g., Engine Components)', density: 150 },
      ];
  
      console.log("material_type", materials_type);
  
      res.status(200).json({
        materials: materials_type, // Send the array as "materials" property in the JSON response
        message: "product_material list",
      });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: "An error occurred while fetching materials" });
    }
  };
// ordering the products by customer
  const order_list =async(req,res)=>{
    try{
        const{from,to,products,quoted_price,bandwidth,actual_price,custmr_id,type,status}=req.body;
        const date=new Date()
        const cus_order = await prisma.customer_details.findUnique({
            where:{
                id:custmr_id
            }
        })
        
     if(!cus_order){
        res.status(400).json({
            error:true,
            status:false,
            message:'customer not found'
        })
     }else{
        await prisma.order_details.create({
            data:{
                from:from,
                to:to,
                order_date:date,
                products:products,
                quoted_price:quoted_price,
                bandwidth:bandwidth,
                actual_price:actual_price,
                custmr_id:custmr_id,
               
                type:type,
           
                status:status
            }
          })
     }
 
  res.status(200).json({
    message:"ordered successfully"
  })
    }catch(err){
        console.error("error==>",err)
    }
  }
//single customer details
  const customerdetails =async(req,res)=>{
    try{
        const{custmr_id}=req.body;
     
        const cus_order = await prisma.customer_details.findMany({
            where:{
                id:custmr_id
            }
        })
        
     if(cus_order){
        res.status(200).json({
            error:false,
            status:true,
            message:'customer found',
            data:cus_order
        })
     
     }
 
  res.status(200).json({
    message:"ordered successfully"
  })
    }catch(err){
        console.error("error==>",err)
    }
  }
//list of providers who entered the amount
  const list_providers=async(req,res)=>{
 const{order_id} = req.body
    try{
       const selection = await prisma.provider_response.findMany({
        where:{
          order_id:order_id
        }
       })
     
       res.status(200).json({
        error:false,
        success:true,
        message:"customer found",
        data:selection
       })

    }catch(err){
        console.error("error--",err)
    }
    
  }
  //customer selecting the provider


const select_provider = async (req, res) => {
  console.log("request=====",req.body)
    const { order_id, provider_id, bid_id, successFlag ,status } = req.body;
    try {
      if (successFlag) {
         await prisma.assignment.create({
          data: {
            order_id: order_id,
            provider_id: provider_id,
            bid_id: bid_id,
            status:successFlag
          },
        });
  } 
  else {
      res.status(400).json ({
          error: true,
          success: false,
          message: "Driver not selected due to unsuccessful flag",
         
        });
      }
      const selected_driver = await prisma.order_details.findUnique({
        where:{
          id:order_id
        }
      })
      await prisma.order_details.update({
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
        message:'customer details found',
        data: selected_driver
      })
      
     } catch (err) {
      console.error("error---", err);
      res.status(500).json({
        error: true,
        success: false,
        message: "Internal server error",
      });
    }
  };
//payment 
  const payment = async(req,res)=>{
    const{order_id,payment_reference,amount,successFlag}=req.body
    const date=new Date
    try{
        if (successFlag) {
            const selection = await prisma.payment.create({
              data: {
                order_id: order_id,
                payment_reference:payment_reference,
                amount:amount,
                date:date,
              },
            });
      
            res.status(200).json({
              error: false,
              success: true,
              message: "Driver selected",
              data: selection,
            });
          } else {
            res.status(200).json({
              error: true,
              success: false,
              message: "Driver not selected due to unsuccessful flag",
            });
          }
   
 
    }catch(err){
        console.error("error===",err)
    }
  }
  
// password reseting 
  const change_password =async(req,res)=>{
    const{customer_id,newpasswords} = req.body
    try{
      if(!newpasswords || newpasswords<8){
        res.status(400).json({
          error:true,
          success:false,
          message:"password should maximum 8 characters"
        })
      }else{
        const hashedpassword = await bcrypt.hash(newpasswords, 10)
        const new_password = await prisma.customer_details.update({
          where:{
            id:customer_id,
          },
          data:{
            password:hashedpassword
          },
        })
        res.status(200).json({
          error:false,
          success:true,
          message:"successfully chaged the password",
          data:new_password
        })
      }

    }catch(err){
      console.error("err==",err)
    }
  }

 //complete details of orders of a single customer
 const complete_order_detail = async(req,res)=>{
  try{
    const{custmr_id} = req.body
    const order_detail =await prisma.order_details.findMany({
      where:{
        custmr_id:custmr_id
      }
    })
    console.log("order_detail-----",order_detail)
    res.status(200).json({
      error:false,
      success:true,
      message:"complete order details",
      data:order_detail
    })
    

  }catch(err){
    console.error("err---",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"internal server error"
    })
  }
 } 
// selectet customer details to provider
 const selected_provider_data = async(req,res)=>{
  try{
    const {order_id} =req.body
    const selected_provider = await prisma.order_details.findUnique({
      where:{
        id:order_id
      }
      
 
    })
    console.log("selected_provider======",selected_provider);
    res.status(200).json({
      error:true,
      success:false,
      message:"customer order details",
      data:selected_provider
    })

  

   

  }catch(err){
   res.status(400).json({
    error:true,
    success:false,
    message:"internal server error"
   })
  }

 }

 //api for listing the complete providers

const listing_providers =async(req,res)=>{
  try{
    const listing = await prisma.provider_details.findMany()
    console.log("listing provider=====",listing)
    res.status(200).json({
      error:false,
      success:true,
      message:"full driver list",
      data:listing
    })

  }catch(err){
    console.error("errorr---",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"internal server error"
    })
  }
  
}

//single customer full  order details
const single_cus_order = async(req,res)=>{
  const {customer_id} =req.body
  try{
    const order_data = await prisma.order_details.findMany({
          where:{
            custmr_id:customer_id
          }
    })
    res.status(200).json({
      error:false,
      success:true,
      message:"complete orders of single customer",
      data:order_data
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
//displaying adress of a single customer
const single_address =async(req,res)=>{
  const{customer_id} = req.body
  try{
    const address = await prisma.address_book.findMany({
      where:{
        custom_id:customer_id
      }
    })
    res.status(200).json({
      error:false,
      success:true,
      message:'complete address of a single customer',
      data:address
    })

  }catch(err){
    console.error("errorr----",err)
    res.status(400).json({
      error:true,
      success:false,
      message:"internal server error"
    })
  }

}




module.exports={registration,logindata,customer_addressbook,customer_feedback,product_material,order_list,customerdetails,list_providers,select_provider,payment,change_password,complete_order_detail,selected_provider_data,listing_providers,single_cus_order,single_address }



