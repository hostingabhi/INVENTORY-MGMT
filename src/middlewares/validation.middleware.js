import {body, validationResult} from 'express-validator'

//export default only work with three down condition only
//HoistedDeclration = > a function
//class
//assignment declartion

const validateRequest = async(req,res, next)=>{
    //Validate data by manual validator
    //make it comment now we going to use express validator
    // const{name, price, imageUrl} = req.body;
    // let errors = [];
    // if(!name || name.trim()==''){
    //     errors.push("Name is required");
    // }
    // if(!price || price.trim()==''){
    //     errors.push("Price is required");
    // }
    // if(!price || parseFloat(price)<1){
    //     errors.push("Price must be a positive value");
    // }
    // if(!name || name.trim()==''){
    //     errors.push("Name is required");
    // }
    // try{
    //     const ValiUrl = new URL(imageUrl)
    // }catch(err){
    //     errors.push("URL  is invalid");
    // }

    //EPRESSS VALIDATOR
    // 1.Setup rules for validation

    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({get:0}).withMessage("Price should be a positive value"),
        body('imageUrl').custom((value)=>{
            if(!req.file){
                throw new Error("Image is required");
            }
            return true;
        }),
    ]

    //2. run those rules.
    await Promise.all(rules.map(rule=> rule.run(req)))

    //3.check if there are any error after running thr rules.
    var validationErrors = validationResult(req);
    
    //4.if there are any error then return the error massage
    if(!validationErrors.isEmpty()){
        return res.render('new-product',{errorMessage: validationErrors.array()[0].msg});
    }
    next();
}

export default validateRequest;