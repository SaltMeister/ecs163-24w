let abFilter = 25
const width = window.innerWidth -100;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 10, right: 30, bottom: 30, left: 60},
    scatterWidth = 400 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 500, distrTop = 0;
let distrMargin = {top: 10, right: 30, bottom: 30, left: 60},
    distrWidth = 500 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 600, teamTop = 50;
let teamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    teamWidth =  width - 800 - teamMargin.left - teamMargin.right,
    teamHeight = 400 - teamMargin.top - teamMargin.bottom;

let parLeft = 50, parTop = 600;
let parMargin = {top: 10, right: 30, bottom: 30, left: 60},
    parWidth =  width - teamMargin.left - teamMargin.right,
    parHeight = 400 - teamMargin.top - teamMargin.bottom;

d3.csv("student-mat.csv").then(rawData =>{
    console.log("rawData", rawData);
    

    rawData.forEach(e => {  
        if(e.absences != null)
            e.absences = Number(e.absences)
        if(e.age != null)
            e.age = Number(e.age)
    });

  //#region plot1 
//plot 1
    const svg = d3.select("svg")


    const g1 = svg.append("g")
                .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
                .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
                .attr("transform", `translate(${scatterMargin.left+ 10}, ${scatterMargin.top+70})`)

                // Bar Graph for student age groups and acohol consumption with age groups
                // ScatterPlot of  age and abscences
                // ADvanced Table

    g1.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -20)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Scatterplot Age and Absences")

    g1.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Number Of Absences")

    // Y label
    g1.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Age")

    const gX = d3.scaleLinear()
    .domain([0, 93])
    .range([0, scatterWidth])

    const gY = d3.scaleLinear()
        .domain([15, 22])
        .range([scatterHeight, 0])

    const gXAxisCall = d3.axisBottom(gX).ticks(20)
    const gYAxisCall = d3.axisLeft(gY).ticks(7)
    
    g1.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(gXAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")
    
    g1.append("g")
    .attr("transform", `translate(0, 0)`)
    .call(gYAxisCall)

    const rects = g1.selectAll("circle").data(rawData)

    rects.enter().append("circle")
        .attr("cx", d =>  gX(d.absences))
        .attr("cy", d =>  gY(d.age) )
        .attr("r", 3)
        .attr("fill", "steelblue")
    //#endregion
    // Plot 2
    //#region plot2
    const g2 = svg.append("g")
    .attr("width", distrLeft + distrMargin.left + distrMargin.right)
    .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
    .attr("transform", `translate(${distrMargin.left}, ${distrMargin.top})`)

    // Process Data
    let graph2Data = []
    
    rawData.forEach(d => {
        let averageConsumption = (Number(d.Dalc) + Number(d.Walc)) / 2

        graph2Data.push(
            {
                "averageConsumption": averageConsumption,
                "g1": Number(d.G1),
                "g2": Number(d.G2),
                "g3": Number(d.G3)
            }
        )

    })

    let highConsumption = graph2Data.filter(d => d.averageConsumption > 2.5)
    let lowConsumption = graph2Data.filter(d => d.averageConsumption <= 2.5)

    // Get Averages of q1 2 3 for each consumption class
    let highQ1 = 0
    let highQ2 = 0
    let highQ3 = 0

    highConsumption.forEach(d => {
        highQ1 += d.g1
        highQ2 += d.g2
        highQ3 += d.g3
    })

    highConsumption = [{
        "quarter": 'G1',
        "grade": highQ1 / highConsumption.length
    }, {
        "quarter": 'G2',
        "grade": highQ2 / highConsumption.length
    }, {
        "quarter": 'G3',
        "grade": highQ3/ highConsumption.length
    }
]

    let lowQ1 = 0
    let lowQ2 = 0
    let lowQ3 = 0

    lowConsumption.forEach(d => {
        lowQ1 += d.g1
        lowQ2 += d.g2
        lowQ3 += d.g3
    })
    lowConsumption = [{
            "quarter": 'G1',
            "grade": lowQ1 / lowConsumption.length
        }, {
            "quarter": 'G2',
            "grade": lowQ2 / lowConsumption.length
        }, {
            "quarter": 'G3',
            "grade": lowQ3 / lowConsumption.length
        }
    ]

    // Plot 2
           
    const g3 = svg.append("g")
                .attr("width", teamWidth + teamMargin.left + teamMargin.right)
                .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
                .attr("transform", `translate(${teamLeft + teamMargin.left}, ${teamTop - teamMargin.top})`)

    const lX = d3.scaleBand()
        .domain(lowConsumption.map(d => d.quarter))
        .range([teamMargin.left, teamWidth])

    const lY = d3.scaleLinear()
        .domain([12, 9])
        .range([teamMargin.top, teamHeight ])

    const lXAxisCall = d3.axisBottom(lX)
    const lYAxisCall = d3.axisLeft(lY)

    g3.append("text")
    .attr("x", (teamWidth / 2) + teamMargin.left - 30)
    .attr("y", 0)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Grades Per Period")

    g3.append("text")
    .attr("x", (teamWidth / 2) + teamMargin.left - 30)
    .attr("y", teamHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Periods")

    g3.append("text")
    .attr("x", -teamHeight/2)
    .attr("y", -20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Grades")

    // Draw Legend
    g3.append("rect")
    .attr("fill", "steelblue")
    .attr("x", teamWidth - teamMargin.left- 50)
    .attr("y", 20)
    .attr("width", 20)
    .attr("height", 20)

    g3.append("text")
    .attr("x", teamWidth - teamMargin.left)
    .attr("y", 35)
    .attr("font-size", "15px")
    .attr("text-anchor", "left")
    .text("Low Alcohol Consumers (average consumption <= 2.5)")

    g3.append("rect")
    .attr("fill", "red")
    .attr("x", teamWidth - teamMargin.left-50)
    .attr("y", 80)
    .attr("width", 20)
    .attr("height", 20)

    g3.append("text")
    .attr("x", teamWidth - teamMargin.left)
    .attr("y", 95)
    .attr("font-size", "15px")
    .attr("text-anchor", "left")
    .text("High Alcohol Consumers (average consumption > 2.5)")

    g3.append("g")
    .attr("transform", `translate(0, ${teamHeight})`)
    .call(lXAxisCall)
        .selectAll("text")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")

    g3.append("g")
    .attr("transform", `translate(${teamMargin.left}, 0)`)
    .call(lYAxisCall)
    .selectAll("text")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(-20, 0)")

    g3.append("path")
        .datum(lowConsumption)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
        .x(d => lX(d.quarter) + lX.bandwidth()/2)
        .y(d => lY(d.grade))
        );

    g3.append("path")
        .datum(highConsumption)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
        .x(d => lX(d.quarter) + lX.bandwidth()/2)
        .y(d => lY(d.grade))
        );
    //#endregion

    //Plot 3
    // Process Data
    let graph3Data = []
    
    rawData.forEach(d => {
        let averageConsumption = (Number(d.Dalc) + Number(d.Walc)) / 2

        graph3Data.push(
            {
                "averageConsumption": averageConsumption,
                "higherEdu (boolean)": d.higher === "yes" ? 1 : 0,
                "activities (boolean)": d.activities === "yes" ? 1 : 0,
                "romantic (boolean)": d.romantic === "yes" ? 1 : 0,
                "nurse (boolean)": d.nursery === "yes" ? 1 : 0,
                "goout": Number(d.goout),
                "famrel": Number(d.famrel),
                
            }
        )

    })
    console.log(graph3Data)
    // Dimensions
    let dimensions = d3.keys(graph3Data[0])
    dimensions.shift()

    let y = {}

    for (i in dimensions){
        let name = dimensions[i]
        y[name] = d3.scaleLinear()
            .domain([0, 5])
            .range([parHeight, 0])
    }
    console.log(y)

    let pX = d3.scalePoint()
        .range([0, parWidth])
        .padding(0.2)
        .domain(dimensions);
    
    
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [pX(p), y[p](d[p])]; }));
    }
    svg.append("rect")
    .attr("width", parWidth)
    .attr("height", parHeight + 50)
    .attr("fill", "grey")
    .attr("transform", `translate(0, ${parTop - 30})`);

    svg.selectAll("myPath")
    .data(graph3Data)
    .enter()
    .append("path")
        //.attr("class", d => "line " + d.Species)
        .attr("d", path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( d.averageConsumption <= 2.5 ? 'steelBlue' : 'red')} )
        .style("opacity", 0.5)
    .attr("transform", `translate(0, ${parTop})`)

    svg.append("text")
    .attr("x", width / 2 )
    .attr("y", parTop - 50)
    .attr("font-size", "25px")
    .attr("text-anchor", "middle")
    .text("Parallel Plot High vs Low Alcohol Consumption")

    svg.selectAll("myAxis")
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    .attr("transform", d => "translate(" + pX(d) + `, ${parTop})`)
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d]))})
    .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black")


}).catch(function(error) {
  console.log(error);
});
    