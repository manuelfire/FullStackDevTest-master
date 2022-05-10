

export  default (error  = "",action ) =>{
    switch (action.type) {
        case "IO_ERROR":
            console.log(action);
            return  "😱 Server error :"+ action.payload.value;
        default:
            return "😇 Server looks fine";
            
    }
}