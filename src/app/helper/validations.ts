const recipeFormError =
{
    name: '',
    imagePath: '',
    description: '',
    amount:''

}
const recipeFormMessages =
{
    name: {
        required: 'Name is required',
        pattern: 'Name should not contain Number'
    },
    imagePath: {
        required: 'Image is required'
    },
    description: {
        required: 'Description is required'
    },
    amount: {
        required: 'Name is required',
        pattern: 'Name should not contain Number'
    },

   
};
const loginFormError=
{
email:'',
password:''
}
const loginFormMesseges=
{
    email:{
        required:'Email is required',
        pattern:'Enter Valid Email...'
    },
    password:{
        required:'Password is required',
        pattern:'Enter Valid Password'
    }
    
}
const IngredientMesseges=
{
amount: {
        required: 'Name is required',
        pattern: 'Name should not contain Number'
    },
}
const allowChartersOnly = '^[a-zA-Z ]+$';
const allowNumbersOnly = '^[0-9]+$';
 const allowedMailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export {
    recipeFormError,
    recipeFormMessages,
    allowChartersOnly,
    IngredientMesseges,
    loginFormError,
    loginFormMesseges,
    allowedMailPattern,
    allowNumbersOnly
}