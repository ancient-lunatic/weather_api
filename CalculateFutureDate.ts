



export class FutureDate
{
    constructor()
    {

    }
    getFutureDate(addDay : number): string {       //return date with addition to sp 
        let today = new Date();
        let dd = today.getDate();
        today.setDate(today.getDate()+addDay)
        dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();


        return (dd + "-" + mm + "-" + yyyy);
    };



}

(<any>window).FutureDate = FutureDate