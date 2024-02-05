let abFilter = 25
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 10, right: 30, bottom: 30, left: 60},
    scatterWidth = 400 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 400, distrTop = 0;
let distrMargin = {top: 10, right: 30, bottom: 30, left: 60},
    distrWidth = 400 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 0, teamTop = 400;
let teamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    teamWidth = width - teamMargin.left - teamMargin.right,
    teamHeight = height-450 - teamMargin.top - teamMargin.bottom;


d3.csv("student-mat.csv").then(rawData =>{
    console.log("rawData", rawData);
    
    // rawData.forEach(function(d){
    //     d.AB = Number(d.AB);
    //     d.H = Number(d.H);
    //     d.salary = Number(d.salary);
    //     d.SO = Number(d.SO);
    // });
    

    // rawData = rawData.filter(d=>d.AB>abFilter);
    // rawData = rawData.map(d=>{
    //                       return {
    //                           "H_AB":d.H/d.AB,
    //                           "SO_AB":d.SO/d.AB,
    //                           "teamID":d.teamID,
    //                       };
    });
    console.log(rawData);
    
//plot 1
    const svg = d3.select("svg")

    const g1 = svg.append("g")
                .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
                .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
                .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

                // Bar Graph for student age groups and acohol consumption with age groups
                // ScatterPlot of  
                // ADvanced Table