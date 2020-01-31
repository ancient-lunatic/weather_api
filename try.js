  
var x = 7


var ud = function()
{
    var x  =4
    var y = function()
    {
        
        console.log(this.x);
    } 
    y()
}
ud()
