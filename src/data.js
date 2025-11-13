export const API_KEY="AIzaSyAW8966MCaxKDV5GYM00_TXlwXXoXlNCck"

export const views_Converter=(views)=>{
   return new Intl.NumberFormat('en',{
    notation: 'compact',
    maximumFractionDigits: 1
   }).format(views);
}