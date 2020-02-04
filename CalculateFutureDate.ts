export class FutureDate
{
  
    getFutureDate(addDay : number): string {       //return date with addition to sp 
        const today = new Date();
        let dd = today.getDate();
        today.setDate(today.getDate()+addDay)
        dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();


        return (dd + "-" + mm + "-" + yyyy);
    };



}

(<any>window).FutureDate = FutureDate