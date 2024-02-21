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
    

    rawData.forEach(e => {  
        if(e.absences != null)
            e.absences = Number(e.absences)
        if(e.age != null)
            e.age = Number(e.age)
    });

    
//plot 1
    const svg = d3.select("svg")


    const g1 = svg.append("g")
                .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
                .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
                .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

                // Bar Graph for student age groups and acohol consumption with age groups
                // ScatterPlot of  age and abscences
                // ADvanced Table

    g1.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", scatterHeight + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("TEST")

    // Y label
    g1.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("SO/AB")

    const gX = d3.scaleLinear()
    .domain([0, 93])
    .range([0, scatterWidth])

    const gY = d3.scaleLinear()
        .domain([15, 22])
        .range([scatterTop, scatterTop + scatterHeight])

    const gXAxisCall = d3.axisBottom(gX).ticks(7)

    g1.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(gXAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

}).catch(function(error){
  console.log(error);
});
    