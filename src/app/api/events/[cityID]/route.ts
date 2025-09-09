import { NextResponse } from "next/server"




const events:Record<string,{id:number;name:string;date:string;location:string;people:number}[]>={
    hyderabad:[
        {id:1,name:"Chess",date:"12th August",location:"Hitech city",people:3},
        {id:2,name:"F1 discussion",date:"15th August",location:"Banjara hills",people:2},
        {id:3,name:"Cricket",date:"20th August",location:"Gachibowli",people:1},
        {id:4,name:"Football",date:"22nd August",location:"KPHB",people:4},
        {id:5,name:"cafe opening",date:"25th August",location:"Madhapur",people:3},
        {id:6,name:"Hiking",date:"30th August",location:"Nehru Zoological Park",people:2},
        {id:7,name:"Book club",date:"5th September",location:"Jubilee hills",people:3},
    ],
    mumbai:[
        {id:1,name:"mumbai politics",date:"5th September",location:"Andheri",people:3},
        {id:2,name:"Cycling",date:"10th September",location:"Bandra",people:2},
    ],
    chennai:[
        {id:1,name:"Tennis",date:"25th September",location:"Adyar",people:4},
        {id:2,name:"Badminton",date:"30th September",location:"Velachery",people:1},
    ]
}

export async function GET( req:Request,{params}:{params:{cityID:string}} ){
    const city=params.cityID.toLowerCase()
    const cityevents= events[city] || []

    return NextResponse.json(cityevents)
}