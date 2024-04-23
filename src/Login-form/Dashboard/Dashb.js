// import React, { useState, useEffect } from "react";
// import Sty from "./Sty.css";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// function Dashb() {
//   const [departmentCount, setDepartmentCount] = useState(null);
// const [departmentCounts, setDepartmentCounts] = useState({});

//   const [departmentCountStudent, setDepartmentCountStudent] = useState(null);
//   const [departmentCountsStudent, setDepartmentCountsStudent] = useState({});
//   useEffect(() => {
//     fetchDepartmentCount();
//     fetchDepartmentCounts();
//     fetchDepartmentCountTotal();
//     fetchDepartmentCountsStudent();
//   }, []);

//     const fetchDepartmentCountTotal = async () => {
//       try {
//         const response = await fetch("http://localhost:1337/getCountStudent");
//         const data = await response.json();
//         setDepartmentCountStudent(data.count);
//       } catch (error) {
//         console.error("Error fetching department count:", error);
//       }
//     };

//     const fetchDepartmentCountsStudent = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:1337/getCountByDepartmentStudent"
//         );
//         const data = await response.json();
//         setDepartmentCountsStudent(data);
//       } catch (error) {
//         console.error("Error fetching department counts:", error);
//       }
//     };

//   const fetchDepartmentCount = async () => {
//     try {
//       const response = await fetch("http://localhost:1337/count");
//       const data = await response.json();
//       setDepartmentCount(data.count);
//     } catch (error) {
//       console.error("Error fetching department count:", error);
//     }
//   };

//    const fetchDepartmentCounts = async () => {
//      try {
//        const response = await fetch("http://localhost:1337/countByDepartment");
//        const data = await response.json();
//        setDepartmentCounts(data);
//      } catch (error) {
//        console.error("Error fetching department counts:", error);
//      }
//    };

//   return (
//     <div className="bordered-content">
//       <div className="inner">
//         <span className="para">Dashboard </span>
//       </div>

//       <div className="division">
//         <div className="dept">
//           <div className="head">
//             Total Teachers: {departmentCount !== null ? departmentCount : 0}
//           </div>
//           <span>CSE : {departmentCounts.cse || 0}</span>
//           <span>ISE : {departmentCounts.ise || 0}</span>
//           <span>ECE : {departmentCounts.ece || 0}</span>
//           <span>EE : {departmentCounts.eee || 0}</span>
//           <span>AIML : {departmentCounts.aiml || 0}</span>
//         </div>

//           <div className="deptstudent">
//           <div className="head">
//             Total Students:
//             {departmentCountStudent !== null ? departmentCountStudent : 0}
//           </div>
//           <span>CSE: {departmentCountsStudent.cse || 0}</span>
//           <span>ISE: {departmentCountsStudent.ise || 0}</span>
//           <span>ECE:  {departmentCountsStudent.ece || 0}</span>
//           <span>EE: {departmentCountsStudent.eee || 0}</span>
//           <span>AIML:  {departmentCountsStudent.aiml || 0}</span>
//         </div>
//       </div>
//       </div>

//   );
// }

// export default Dashb;

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";

// function Dashb() {
//   const [departmentCount, setDepartmentCount] = useState([]);
//   const [deptNames, setDeptNames] = useState([]);
//    const [studepartmentCount, setstuDepartmentCount] = useState([]);
//    const [studeptNames, setstuDeptNames] = useState([]);

//   useEffect(() => {
//     const getTeacherdata = async () => {
//       try {
//         const response = await fetch("http://localhost:1337/teacher");
//         const data = await response.json();

//         // Count occurrences of each department and extract department names
//         const departmentCountObj = {};
//         data.forEach((teacher) => {
//           const department = teacher.designation;
//           departmentCountObj[department] =
//             (departmentCountObj[department] || 0) + 1;
//         });

//         const departmentCounts = Object.values(departmentCountObj);
//         const departmentNames = Object.keys(departmentCountObj);

//         setDepartmentCount(departmentCounts);
//         setDeptNames(departmentNames);

//         console.log(departmentCounts);
//         console.log(departmentNames);
//       } catch (error) {
//         console.error("Error fetching department data:", error);
//       }
//     };

//     const getStudentdata = async () => {
//        try {
//          const response = await fetch("http://localhost:1337/fetchAllstudent");
//          const data = await response.json();

//          // Count occurrences of each department and extract department names
//          const departmentCountObj = {};
//          data.forEach((teacher) => {
//            const department = teacher.department;
//            departmentCountObj[department] =
//              (departmentCountObj[department] || 0) + 1;
//          });

//          const departmentCounts = Object.values(departmentCountObj);
//          const departmentNames = Object.keys(departmentCountObj);

//          setstuDepartmentCount(departmentCounts);
//          setstuDeptNames(departmentNames);

//          console.log(departmentCounts);
//          console.log(departmentNames);
//        } catch (error) {
//          console.error("Error fetching department data:", error);
//        }

//     };
//     getTeacherdata();
//     getStudentdata();
//   }, []);

//   return (
//     <React.Fragment>
//       <Chart
//         type="pie"
//         width={900}
//         height={300}
//         series={departmentCount}
//         options={{
//           noData: { text: "Empty Data" },
//           labels: deptNames,
//           legend: {
//             position: "top",
//           },
//         }}
//       />

//     </React.Fragment>
//   );
// }

// export default Dashb;

import React, { Component } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import "./Sty.css";
import Dashb1 from "./Dashb1"; // Import your custom popup CSS file

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCounts: {},
      clickedDepartment: null,
      clickedStudents: [],
      clickedColor: null, // New state to store the clicked color
    };
    this.studentChartRef = React.createRef();
  }

  componentDidMount() {
    this.getStudentdata(); // Fetch data when component mounts
  }

  async getStudentdata() {
    try {
      // Fetch student data from the API
      const response = await fetch("http://localhost:1337/fetchAllstudent");
      const data = await response.json();

      // Count occurrences of each department and extract department names
      const departmentCountObj = {};
      data.forEach((student) => {
        const department = student.department;
        departmentCountObj[department] =
          (departmentCountObj[department] || 0) + 1;
      });

      // Update state with the new department counts
      this.setState({
        departmentCounts: departmentCountObj,
      });

      // Render the chart after fetching data
      this.renderStudentChart();
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

  renderStudentChart() {
    const { departmentCounts } = this.state;

    const chartData = {
      labels: Object.keys(departmentCounts),
      datasets: [
        {
          label: "Number of Students",
          data: Object.values(departmentCounts),
          backgroundColor: [
            "#0033cc",
            "#ff0000",
            "#00ff00",
            "#ff00ff",
            "#ffff1a",
            "#663300",
            "#999966",
            "#999966",
            "#ff0066",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    if (this.studentChartRef.current) {
      const ctx = this.studentChartRef.current.getContext("2d");

      if (this.studentChartInstance) {
        this.studentChartInstance.destroy();
      }

      this.studentChartInstance = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Students",
                font: {
                  size: 14,
                  weight: "bolder",
                },
                color: "black",
              },
              ticks: {
                font: {
                  size: 12,
                  weight: "bolder",
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Number of Students by Department",
              font: {
                size: 20,
                weight: "bolder",
              },
              color: "black",
            },
            legend: {
              display: false, // Hide the legend
            },
          },
        },
      });

      // Add event listener to the chart canvas element
      this.studentChartRef.current.onclick = async (event) => {
        const activePoints = this.studentChartInstance.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: true },
          true
        );

        if (activePoints.length > 0) {
          const clickedDepartment = chartData.labels[activePoints[0].index];
          const clickedColor =
            chartData.datasets[0].backgroundColor[activePoints[0].index];

          // Send a GET request to fetch students of the clicked department
          try {
            const response = await axios.get(
              "http://localhost:1337/students/byDepartment",
              {
                params: {
                  dept: clickedDepartment,
                },
              }
            );
            const students = response.data;

            // Update state with clicked department, students, and color
            this.setState({
              clickedDepartment,
              clickedStudents: students,
              clickedColor,
            });
          } catch (error) {
            console.error("Error fetching students:", error);
          }
        }
      };
    } else {
      console.error("Student chart reference not found!");
    }
  }

  render() {
    const { clickedDepartment, clickedStudents, clickedColor } = this.state;
    return (
      <div className="bordered-content">
        <div className="inner">
          <span className="para">Dashboard </span>
        </div>
        <div className="chart-container">
          <Dashb1 />
          <div className="content1">
            <div className="doctor-canvas-container">
              <canvas
                ref={this.studentChartRef}
                width={300}
                height={300}
              ></canvas>
            </div>
            {clickedDepartment && (
              <div className="custom-popup-overlay">
                <div
                  className="custom-popup"
                 
                >
                  <div className="custom-popup-header">
                    <h3>{clickedDepartment} students:</h3>
                    <button
                      className="close-button"
                      onClick={() => this.setState({ clickedDepartment: null })}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="custom-popup-body">
                    <ul>
                      {clickedStudents.map((student, index) => (
                        <li key={index}>{student}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// class Dashb extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       departmentCount: [],
//       deptNames: [],
//       studepartmentCount: [],
//       studeptNames: [],
//     };
//   }

//   componentDidMount() {
//     this.getTeacherdata();
//     this.getStudentdata();
//   }

//   getTeacherdata = async () => {
//     try {
//       const response = await fetch("http://localhost:1337/teacher");
//       const data = await response.json();

//       const departmentCountObj = {};
//       data.forEach((teacher) => {
//         const department = teacher.designation;
//         departmentCountObj[department] =
//           (departmentCountObj[department] || 0) + 1;
//       });

//       const departmentCounts = Object.values(departmentCountObj);
//       const departmentNames = Object.keys(departmentCountObj);

//       this.setState({
//         departmentCount: departmentCounts,
//         deptNames: departmentNames,
//       });
//     } catch (error) {
//       console.error("Error fetching department data:", error);
//     }
//   };

//   getStudentdata = async () => {
//     try {
//       const response = await fetch("http://localhost:1337/fetchAllstudent");
//       const data = await response.json();

//       const departmentCountObj = {};
//       data.forEach((student) => {
//         const department = student.department;
//         departmentCountObj[department] =
//           (departmentCountObj[department] || 0) + 1;
//       });

//       const departmentCounts = Object.values(departmentCountObj);
//       const departmentNames = Object.keys(departmentCountObj);

//       this.setState({
//         studepartmentCount: departmentCounts,
//         studeptNames: departmentNames,
//       });
//     } catch (error) {
//       console.error("Error fetching department data:", error);
//     }
//   };

//   render() {
//     const { departmentCount, deptNames } = this.state;
//     return (
//       <React.Fragment>
//         <Chart
//           type="pie"
//           width={900}
//           height={300}
//           series={departmentCount}
//           options={{
//             noData: { text: "Empty Data" },
//             labels: deptNames,
//             legend: {
//               position: "top",
//             },
//           }}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default Dashb;
