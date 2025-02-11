import React,{useEffect, useMemo, useState} from 'react'
import './Dashboard.css'
import Appbar from '../../components/Appbar/Appbar';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import {Tooltip} from '@mui/material';
import {Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import { Typography  } from '@mui/material';
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import vehicle from '../../images/vehicle.png';
import vehicle1 from '../../images/vehicle1.png';
import percent from '../../images/percent.png';
import redpercent from '../../images/redpercent.png';
import tick from '../../images/tick.png';
import warning from '../../images/warning.png';
import WarningCircle from '../../images/WarningCircle.png';
import X from '../../images/X.png';
import Sort from '../../images/SortAscending.svg';
import { useNavigate } from 'react-router-dom';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { fetchDefectInspectedRecordWise, fetchDefectInspectionWise, fetchFailedInspectionWise, fetchInspectedRecordsWise, fetchRecordWise, fetchSuccessfulInspectedRecordWise, fetchUninspectedPartWise, resultMapping } from '../../API/api';

export default function Dashboard() {

    const [loader,setLoader] = useState(false)
    const [dashboardALert,setDashboardAlert] = useState(false)

    const navigate = useNavigate();


    const [dashboardDate,setDashboardDate] = useState( localStorage.getItem('dashboardDate') || new Date().toISOString().slice(0, 10))


    const handleDashboardDate = (event) => {
      if(event.target.value){
      setDashboardDate(event.target.value);
      localStorage.setItem('dashboardDate',event.target.value)
      setDefectPage(0)
      setFailedPage(0)
      setUninspectedPage(0)
      }
      else{
        setDashboardAlert(true)
      }
    };

    const handlePreviousDate = () => {
      if (dashboardDate) {
        const previousDate = new Date(dashboardDate); // Create a new Date object
        previousDate.setDate(previousDate.getDate() - 1); // Subtract one day
        // Format the date to yyyy-mm-dd
        const formattedDate = previousDate.toISOString().split('T')[0];

        setDashboardDate(formattedDate); // Set the state to the previous date
       // console.log(formattedDate);
       setDefectPage(0)
      setFailedPage(0)
      setUninspectedPage(0)
      }
    }

    const handleNextDate = () => {
      if (dashboardDate) {
        const nextDate = new Date(dashboardDate); // Create a new Date object
        nextDate.setDate(nextDate.getDate() + 1); // add one day
        // Format the date to yyyy-mm-dd
        const formattedDate = nextDate.toISOString().split('T')[0];

        setDashboardDate(formattedDate); // Set the state to the previous date
       // console.log(formattedDate);
       setDefectPage(0)
      setFailedPage(0)
      setUninspectedPage(0)
      }
    }
    
    const [totalvehicles,setTotalVehicles]=useState(600)
    const [vehiclesInspected,setVehiclesInspected]=useState(588)
    const [vehiclesUninspected,setVehiclesUninspected]=useState(2)
    const [vehiclePercent,setVehiclePercent]=useState(0)
    const [successfulInspections,setSuccessfulInspections]=useState(578)
    const [failedInspections,setFailedInspections]=useState(10)
    const [defects,setDefects]=useState(24)
    const [defectPer100,setDefectPer100]=useState(0)

      const refreshData = () =>{
        alert('data generated')
      }

      const [failedData, setFailedData] = useState(
        [
        {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcount": 21,
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Failed",
            "action":"Details"
          },
          {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcount": 21,
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Failed",
            "action":"Details"
          },
          {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcount": 21,
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Failed",
            "action":"Details"
          },
          {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcount": 21,
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Failed",
            "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcount": 21,
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcount": 21,
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcount": 21,
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
      ]
      );

      const [defectsData, setDefectsData] = useState(
        [
          {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcode": '39105M77S00-5PK',
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Missing",
            "action":"Details"
          },
          {
            "psn": 1260,
            "model": 'YHB23D2BP0600000',
            "chassisno": "MA3BNC62SRC777834",
            "partcode": '39105M77S00-5PK',
            "shift": "A",
            "datetime": "10 Apr 2024, 10:38 AM",
            "status": "Incorrect",
            "action":"Details"
          },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Flipped",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        }
      ]
      );

      const [uninspectedvehicles,setUninspectedData] = useState([
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        },
        {
          "psn": 1260,
          "model": 'YHB23D2BP0600000',
          "chassisno": "MA3BNC62SRC777834",
          "partcode": '39105M77S00-5PK',
          "shift": "A",
          "datetime": "10 Apr 2024, 10:38 AM",
          "status": "Failed",
          "action":"Details"
        }
      ])

      const [failedPage, setFailedPage] = useState(0);


      const handleFailedPageChange = (newPage) => {
        setFailedPage(newPage);
      };
    
      const [defectPage, setDefectPage] = useState(0)

      const handleDefectPageChange = (newPage) => {
        setDefectPage(newPage);
      };

      const [uninspectedPage, setUninspectedPage] = useState(0);


      const handleUninpspectedPageChange = (newPage) => {
        setUninspectedPage(newPage);
      };

      const [shift,setShift] = useState('All Shifts')

      // useEffect(() => {
      //             async function called(){
      //                       try { 
      //                               let shiftFilter = ''
      //                               if(shift !== "All Shifts"){
      //                                 shiftFilter = shift;
      //                               }
      //                               const response = await fetchRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(response?.data){
      //                                 setTotalVehicles(response?.data?.result[0]?.total);
      //                               }
      //                               const response_1 = await fetchInspectedRecordsWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(response_1?.data){
      //                                 setVehiclesInspected(response_1?.data?.result[0]?.total);
      //                                 setVehiclesUninspected(Math.abs((response_1?.data?.result[0]?.total) - (response?.data?.result[0]?.total)));
      //                               }
      //                               const response_2 = await fetchSuccessfulInspectedRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(response_2?.data){
      //                                 setSuccessfulInspections(response_2?.data?.result[0]?.total);
      //                                 setFailedInspections(Math.abs((response_1?.data?.result[0]?.total) - (response_2?.data?.result[0]?.total)));
      //                               }
      //                               const response_3 = await fetchDefectInspectedRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(response_3?.data){
      //                                 setDefects(response_3?.data?.result);
      //                                 if((response_1?.data?.result[0]?.total) !== 0)    setDefectPer100(((response_3?.data?.result)/((response_1?.data?.result[0]?.total))) * 100);
      //                                 else setDefectPer100(0);
      //                               }
      //                               const FailedInsectionsData = await fetchFailedInspectionWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(FailedInsectionsData?.data?.result){
      //                                 setFailedData(FailedInsectionsData?.data?.result);
      //                               }

      //                               const DefectInsectionsData = await fetchDefectInspectionWise({"selectedDate": dashboardDate,shift:shiftFilter});
      //                               if(DefectInsectionsData?.data?.result){
                                      
      //               let updatedData = (DefectInsectionsData?.data?.result)?.filter((item) => (item?.Result !==1) );
      //               setDefectsData(updatedData);
                                      
      //                               }

      //                             if((response?.data?.result[0]?.total) !== 0)  setVehiclePercent(((response_1?.data?.result[0]?.total)/(response?.data?.result[0]?.total)) * 100);
      //                             else setVehiclePercent(0);
                                    

      //                       } catch (error) {
                              
      //                       }finally{

      //                       }
      //             }

      //             called();
      // },[])
      const [rates,setRates] = useState([0,0,0,0,0,0,0,0]);
      useEffect(() => {
        async function called(){
          try {   
                  let shiftFilter = ''
                  if(shift !== "All Shifts"){
                              shiftFilter = shift;
                  }
                  let vehicleUninsp_1 = 0;
                  let percentagePerVehicle_1 = 0;
                  let failedInsp_1 = 0;
                  let defectPer100_1 = 0;
                  const response = await fetchRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
                 // console.log("Res"+response)
                  if(response?.data){
                    setTotalVehicles(response?.data?.result[0]?.total);
                  }
                  const response_1 = await fetchInspectedRecordsWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  if(response_1?.data){
                    setVehiclesInspected(response_1?.data?.result[0]?.total);
                    setVehiclesUninspected(Math.abs((response_1?.data?.result[0]?.total) - (response?.data?.result[0]?.total)));
                  }
                  const response_2 = await fetchSuccessfulInspectedRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  if(response_2?.data){
                    setSuccessfulInspections(response_2?.data?.result[0]?.total);
                    setFailedInspections(Math.abs((response_1?.data?.result[0]?.total) - (response_2?.data?.result[0]?.total)));
                    failedInsp_1 = Math.abs((response_1?.data?.result[0]?.total) - (response_2?.data?.result[0]?.total));
                  }
                  const response_3 = await fetchDefectInspectedRecordWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  if(response_3?.data){
                    setDefects(response_3?.data?.result);
                    if((response_1?.data?.result[0]?.total) !== 0) {
                         defectPer100_1 = ((response_3?.data?.result)/((response_1?.data?.result[0]?.total))) * 100;
                         console.log(defectPer100_1);
                         setDefectPer100(((response_3?.data?.result)/((response_1?.data?.result[0]?.total))) * 100);
                      }
                     else {
                      defectPer100_1 = 0;
                      setDefectPer100(0);
                    }
                  }
                  const FailedInsectionsData = await fetchFailedInspectionWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  if(FailedInsectionsData?.data?.result){
                    setFailedData(FailedInsectionsData?.data?.result);
                    if(FailedInsectionsData?.data?.result?.length <= (failedPage*5)) {
                     setFailedPage(0);
                   }
                  }
                  const DefectInsectionsData = await fetchDefectInspectionWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  if(DefectInsectionsData?.data?.result){
                   
                    let updatedData = (DefectInsectionsData?.data?.result)?.filter((item) => (item?.Result !==1 ) );
                    if(updatedData?.length <= (  defectPage*5)) {
                      setDefectPage(0);
                    }
                    setDefectsData(updatedData);
                    
                  }
                  const uninspectedpartdata = await fetchUninspectedPartWise({"selectedDate": dashboardDate,shift:shiftFilter});
                  console.log(uninspectedpartdata)
                  if(uninspectedpartdata?.data?.result) {
                        setUninspectedData(uninspectedpartdata?.data?.result);
                  }
                  if((response?.data?.result[0]?.total) !== 0) { 
                    percentagePerVehicle_1 = (parseInt(response_1?.data?.result[0]?.total)/parseInt(response?.data?.result[0]?.total)) * 100;
                    setVehiclePercent(((response_1?.data?.result[0]?.total)/(response?.data?.result[0]?.total)) * 100);
                  }
                  else {
                    percentagePerVehicle_1 = 0
                    setVehiclePercent(0);
                  }
                
                  if(true) {
                    let result = [];
                        
                          let yesterday = new Date(dashboardDate);
                          yesterday.setDate(yesterday.getDate() - 1);
                          yesterday = yesterday.toISOString().slice(0, 10);
                         // console.log(yesterday);
                          let vehicleUninsp = 0;
                          let percentagePerVehicle = 0;
                          let failedInsp = 0;
                          let defectPer100 = 0;
                          
                          const response_4 = await fetchRecordWise({"selectedDate": yesterday,shift:shiftFilter});
                          
                          if(response_4?.data) {
                                    result.push(response_4.data?.result[0]?.total || 0);
                          }
                          
                          const response_5 = await fetchInspectedRecordsWise({"selectedDate": yesterday,shift:shiftFilter});
                          
                          if(response_5?.data) {
                            result.push(response_5.data?.result[0]?.total || 0);
                            if((Math.abs((response_5?.data?.result[0]?.total) - (response_4?.data?.result[0]?.total))) !== 0) {
                               vehicleUninsp = (((Math.abs((response_5?.data?.result[0]?.total) - (response_4?.data?.result[0]?.total))) - (Math.abs((response_1?.data?.result[0]?.total) - (response?.data?.result[0]?.total)))))/ (Math.abs((response_5?.data?.result[0]?.total) - (response_4?.data?.result[0]?.total)));
                            } else {
                               vehicleUninsp = Math.abs((response_5?.data?.result[0]?.total) - (response_4?.data?.result[0]?.total));
                            }
                          if((response_4?.data?.result[0]?.total)!==0)  percentagePerVehicle = (parseInt(response_5?.data?.result[0]?.total)/parseInt(response_4?.data?.result[0]?.total)) * 100;
                          else percentagePerVehicle = parseInt(response_5?.data?.result[0]?.total);
                          if(percentagePerVehicle !== 0)  percentagePerVehicle = ((percentagePerVehicle_1 - percentagePerVehicle) / percentagePerVehicle ) * 100;
                          else percentagePerVehicle = percentagePerVehicle_1;
                          }
                          
                           const response_6 = await fetchSuccessfulInspectedRecordWise({"selectedDate": yesterday,shift:shiftFilter});
                          
                           if(response_6?.data) {
                            result.push(response_6.data?.result[0]?.total || 0);
                              failedInsp =  Math.abs((response_6?.data?.result[0]?.total) - (response_5?.data?.result[0]?.total));
                               if(failedInsp !== 0) failedInsp = ( (failedInsp_1 - failedInsp) / failedInsp ) * 100;
                               else failedInsp = failedInsp_1;
                           }
                          
                           const response_7 = await fetchDefectInspectedRecordWise({"selectedDate": yesterday,shift:shiftFilter});
                          
                           if(response_7?.data) {
                            result.push(response_7.data?.result || 0);
                            if((response_5?.data?.result[0]?.total) !== 0) defectPer100 = ((response_7?.data?.result)/((response_5?.data?.result[0]?.total)))*100;
                            else defectPer100 = (response_7?.data?.result);
                            if(defectPer100 !== 0) defectPer100 = ( (defectPer100_1 - defectPer100) / defectPer100 ) * 100;
                            else defectPer100 = (defectPer100_1);
                            console.log(defectPer100_1);
                           }
                          
                           localStorage.setRanges = JSON.stringify(result);
                           
                                if(result[0] !== 0)  result[0] = ((((response?.data?.result[0]?.total) - result[0]) / result[0] ) * 100)?.toFixed(2);
                                else{ result[0] = (response?.data?.result[0]?.total);}
                                if(result[1] !== 0)  result[1] =( (((response_1?.data?.result[0]?.total) - result[1]) / result[1] ) * 100)?.toFixed(2);
                                else result[1] = (response_1?.data?.result[0]?.total);
                                if(result[2] !== 0)  result[2] = ((((response_2?.data?.result[0]?.total) - result[2]) / result[2] ) * 100)?.toFixed(2);
                                else result[2] = (response_2?.data?.result[0]?.total);
                                if(result[3] !== 0)  result[3] = ((((response_3?.data?.result) - result[3]) / result[3] ) * 100)?.toFixed(2);
                                else result[3] = (response_3?.data?.result);
                                result.push((vehicleUninsp).toFixed(2)); // 4 -> vehicles uninspected
                                result.push((percentagePerVehicle).toFixed(2)); // 5 -> perecntage of vehicles inspected
                                result.push((failedInsp.toFixed(2))); // 6 -> failed inspections
                                console.log(defectPer100);
                                result.push((defectPer100).toFixed(2)); // 7 -> defects per 100 vehicles
                               let final_result = result?.map((value) => {
                                  if(value > 100) {
                                    value = 100;
                                  }
                                  return value;
                                })
                                setRates(final_result);
                   }

          } catch (error) {
            
          }finally{

          }
}

called();
      },[dashboardDate,shift]);

      const [sort,setSort] = useState(false)
      const handleSortClick = () =>{
        setSort((prevSort) => !prevSort)
      }
      const [sortType,setSortType] = useState('Descending')
      const handleSorting = (type) =>{
        setSortType(type)
      }

      const [sort_1,setSort_1] = useState(false)
      const handleSortClick_1 = () =>{
        setSort_1((prevSort) => !prevSort)
      }
      const [sortType_1,setSortType_1] = useState('Descending')
      const handleSorting_1 = (type) =>{
        setSortType_1(type)
      }
      const [sortType_2,setSortType_2] = useState('Descending')
      const handleSorting_2 = (type) =>{
        setSortType_2(type)
      }
      const sortData = (data, sortType) => {
        return [...data].sort((a, b) => {
          const dateA = new Date(a.datetime);
          const dateB = new Date(b.datetime);
          if (sortType == 'Ascending') {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
      };
      const sortedFailedData = useMemo(() => sortData(failedData, sortType_1), [failedData, sortType_1]);
      const sortedDefectsData = useMemo(() => sortData(defectsData, sortType), [defectsData, sortType]);
      const sortedUninspectedData = useMemo(() => sortData(uninspectedvehicles,sortType_2),[uninspectedvehicles,sortType_2])
      const [searchTerm, setSearchTerm] = useState('');
      const filteredData = sortedFailedData?.filter((data) =>
        data?.PSN?.toLowerCase().includes(searchTerm?.toLowerCase()) || data?.Model?.toLowerCase().includes(searchTerm?.toLowerCase()) || data?.ChassisNumber?.toLowerCase().includes(searchTerm?.toLowerCase())
      );

      const [searchTerm_1, setSearchTerm_1] = useState('');
      const filteredData_1 = sortedDefectsData?.filter((data) =>
        data?.PSN?.toLowerCase().includes(searchTerm_1?.toLowerCase()) || data?.Model?.toLowerCase().includes(searchTerm_1?.toLowerCase()) || data?.ChassisNumber?.toLowerCase().includes(searchTerm_1?.toLowerCase())
      );

      const [searchTerm_2, setSearchTerm_2] = useState('');
      const filteredData_2 = sortedUninspectedData?.filter((data) =>
        data?.PSN?.toLowerCase().includes(searchTerm_1?.toLowerCase()) || data?.Model?.toLowerCase().includes(searchTerm_1?.toLowerCase()) || data?.ChassisNumber?.toLowerCase().includes(searchTerm_1?.toLowerCase())
      );

  return (
    <>
      <Appbar title="Dashboard" />
      <div className='dashboard_main' >
        <div className='dashboard_content_1'>
          <div className='title_date'>
            <div className='title-icon-overview' style={{marginTop:'39px'}}>
              <p className='dashboard_overview_head'>Overview</p>
            </div>
            <div className='dashboard_date_filter' style={{marginTop:'30px'}}>
              <KeyboardArrowLeftIcon style={{color:'#3B4453',width:'18px',height:'18px',cursor:'pointer'}} onClick={handlePreviousDate} />
              <input type='date' max={new Date().toISOString().slice(0, 10)} className='dashboard_date' value={dashboardDate} onChange={handleDashboardDate} />
              {dashboardDate == new Date().toISOString().slice(0, 10) ? <KeyboardArrowRightIcon style={{width:'18px',height:'18px',opacity: 0.2, cursor: 'not-allowed'}} /> : <KeyboardArrowRightIcon style={{color:'#3B4453',width:'18px',height:'18px',cursor:'pointer'}} onClick={handleNextDate} /> }
              <Tooltip title='Reload'>
                <div className='refresh_data' onClick={refreshData}><RefreshIcon /></div>
              </Tooltip>
            </div>
          </div>
          <div className='overview_shift'>
            <div className={shift == 'All Shifts' ? 'all' : 'overview_shift_wise'} onClick={()=>{setShift('All Shifts');setDefectPage(0);setFailedPage(0);setUninspectedPage(0)}}>All Shifts</div>
            <div className={shift == 'shiftA' ? 'a' : 'overview_shift_wise'} onClick={()=>{setShift('shiftA');setDefectPage(0);setFailedPage(0);setUninspectedPage(0)}}>Shift A</div>
            <div className={shift == 'shiftB' ? 'b' : 'overview_shift_wise'} onClick={()=>{setShift('shiftB');setDefectPage(0);setFailedPage(0);setUninspectedPage(0)}}>Shift B</div>
          </div>
          {loader ?  
          <LoadSpinner height='100vh' /> :  
          <div className='content-box'>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#DAE3F5'}}>
                <img src={vehicle} alt='vehicle' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Total Vehicles</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{totalvehicles}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[0] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[0] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[0])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#D7F0E5'}}>
                <img src={vehicle1} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Vehicles Inspected</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{vehiclesInspected}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[1] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[1] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[1])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#FFEECC'}}>
                <img src={WarningCircle} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'20px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Vehicles Uninspected</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{vehiclesUninspected}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[4] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[4] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[4])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#CCE0FF'}}>
                <img src={percent} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'17.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Percentage of Vehicles Inspected</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{Math.round(vehiclePercent)}%</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[5] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[5] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[5])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#D7F0E5'}}>
                <img src={tick} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Successful Inspections</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{successfulInspections}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[2] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[2] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[2])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#FFDDD6'}}>
                <img src={X} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'17px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Failed Inspections</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{failedInspections}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[6] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[6] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[6])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#FFEECC'}}>
                <img src={warning} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'19.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Defects</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{defects}</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[3] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[3] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[3])}%</span> vs yesterday</p>
              </div>
            </div>
            <div className='content'>
              <div className='icon_bg' style={{backgroundColor:'#FFDDD6'}}>
                <img src={redpercent} alt='vehicle1' style={{margintop:'2.81',marginLeft:'0.31',width:'17.38px',height:'15px'}} />
              </div>
              <div className='overview_matter'>
                <div className='overview_sub_matter'>
                  <p style={{fontSize:'14px',lineHeight:'20px',letterSpacing:'1%',color:'#707784'}}>Defects per 100 Vehicles</p>
                  <p style={{color:'#101623',fontSize:'36px',fontWeight:'bold',lineHeight:'44px',letterSpacing:'-1%',wordBreak:'break-all'}}>{Math.round(defectPer100)}%</p>
                </div>
                <p style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'2px',fontSize:'14px',color:'#707784',lineHeight:'20px',letterSpacing:'1%'}}>{rates[7] < 0 ? <SouthEastIcon style={{fontSize:'16px',color:'#FF5630'}}/> : <CallMadeIcon style={{fontSize:'16px',color:'#36B37E'}} />}<span style={{color: rates[7] >= 0 ? '#36B37E' : '#FF5630'}}>{rates && Math.abs(rates[7])}%</span> vs yesterday</p>
              </div>
            </div>
          </div>
          }
        </div>

        <div className='dashboard_content_1'>
          <div className='overview'>
            <div className='overview_head' style={{justifyContent:'flex-start'}}>
              <div className='overview_head_div'>
              </div>
              <p className='overview_head_text'>Failed Inspections ({filteredData?.length})</p>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:'0px',flexGrow:'0',marginTop:'24px'}}>


              {/* search bar (mui) */}
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 346,backgroundColor:'#f4f5f6',boxShadow:'none',height:40 }}
                >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by PSN, Model, Chassis"
                    inputProps={{ 'aria-label': 'Search by PSN, Model, Chassis' }}
                    onChange={(e) => {setSearchTerm(e.target.value); setFailedPage(0);}}
                    value={searchTerm}
                />  
                </Paper>

                <div className='overview_search_sort'>
                <div className='overview_search_sort_inner' onClick={handleSortClick_1}>
                  <p>Sort</p>
                  <img src={Sort} alt='sort' style={{width:'20px',height:'20px'}} />
                </div>
                {sort_1 && <div className='sort_sub_div'>
                  <p onClick={ () =>{
                    handleSorting_1('Ascending');
                    handleSortClick_1();
                  }
                } style={{color: sortType_1 == 'Ascending' && '#395DAB' }}>Sort Ascending(Time)</p>
                  <p onClick={ () =>{
                    handleSorting_1('Descending');
                    handleSortClick_1();
                  }
                } style={{color: sortType_1 == 'Descending' && '#395DAB' }}>Sort Descending(Time)</p>
                </div>}
              </div>
            </div>


            <div className='overview-table-container'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>PSN</th>
                    <th>MODEL</th>
                    <th>CHASSIS NO</th>
                    {/* <th>PART COUNT</th> */}
                    <th>SHIFT</th>
                    <th>DATE & TIME</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                {loader ? (
                  <tbody>
                    <tr>
                      <td align="center" colSpan={8}>
                        <LoadSpinner height='100%' />
                      </td>
                    </tr>
                  </tbody>
                ) : filteredData?.length ? (
                  <>
                    <tbody>
                      {filteredData?.slice(failedPage * 5, (failedPage + 1) * 5).map((data, index) => {
                        return (
                          <tr key={index} className='tr-light'>
                            <td>{data?.PSN}</td>
                            <td style={{color:'#395DAB',fontWeight:'600',cursor:'pointer'}} >{data?.Model}</td>
                            <td>{data?.ChassisNumber}</td>
                            {/* <td>{((data?.PartTypes)?.split(','))?.length}</td> */}
                            <td>{data?.Shift}</td>
                            <td>
                                    {data?.datetime && (() => {
                                      // Parse the timestamp string into a Date object
                                      let timestamp = new Date(data.datetime);

                                      // Add 5 hours and 30 minutes to the timestamp
                                      timestamp.setHours(timestamp.getHours() + 5);
                                      timestamp.setMinutes(timestamp.getMinutes() + 30);

                                      // Format the adjusted timestamp into the desired format (YYYY-MM-DDTHH:mm:ss)
                                      let adjustedTimestamp = timestamp.toISOString();
                                      
                                       // Remove the ".00Z" at the end
                                       adjustedTimestamp = adjustedTimestamp.slice(0, -5);

                                      // Split the adjusted timestamp into date and time components
                                      let [date, time] = adjustedTimestamp.split("T");

                                      // Return the formatted date and time
                                      return `${date} ${time}`;
                                    })()}
                          </td>

                            <td>
                              <div className='overview_status'>
                                <p style={{fontWeight:'500',fontSize:'14px',lineHeight:'20px',letterSpacing:'1%'}}>{data?.Result ? "Success" : "Failed"}</p>
                              </div>
                            </td>
                            <td style={{color:'#395DAB',fontWeight:'600',cursor:'pointer'}}>
                            <a href={`/inspection/overview/${JSON.stringify(data)}`} target="_blank" style={{textDecoration:'none',color:'#395DAB'}}> View Details</a> 
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <td colSpan={8} style={{padding:'0px'}}>
                        <div className='tfoot'>
                          <p style={{fontSize:'14px',fontWeight:'500',lineHeight:'20px',letterSpacing:'1%',color:'#A0A8B0'}}>Page {failedPage + 1} of {Math.ceil(filteredData.length / 5)}</p>
                          <div className='paginated_right'>
                            {failedPage === 0 ? <ChevronLeftIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronLeftIcon onClick={() => handleFailedPageChange(failedPage - 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                            {Array.from({ length: Math.ceil(filteredData.length / 5) }).map((_, index) => {
                              // Calculate the start and end pages for the current group of 5 pages
                              const startPage = Math.floor(failedPage / 5) * 5; // Calculate the start page of the current group
                              const endPage = Math.min(startPage + 4, Math.ceil(filteredData.length / 5) - 1); // Calculate the end page of the current group
                              
                              // Render page numbers within the current group
                              if (index >= startPage && index <= endPage) {
                                return (
                                  <div className={index === failedPage ? 'pagenum' : 'pagenum1'} key={index} onClick={() => handleFailedPageChange(index)}>
                                    <p>{index + 1}</p>
                                  </div>
                                );
                              }
                              // Render null for page numbers outside the current group
                              return null;
                            })}
                            {failedPage + 1 === Math.ceil(filteredData.length / 5) ? <ChevronRightIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronRightIcon onClick={() => handleFailedPageChange(failedPage + 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                          </div>
                        </div>
                      </td>
                    </tfoot>
                  </>
                ) : (
                  <tbody>
                    <tr >
                      <td colSpan={8} >
                        <h2 style={{textAlign:'center'}}>No Data</h2>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        <div className='dashboard_content_1'>
          <div className='overview'>
            <div className='overview_head' style={{justifyContent:'flex-start'}}>
              <div className='overview_head_div'>
              </div>
              <p className='overview_head_text'>Defects ({filteredData_1.length})</p>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:'0px',flexGrow:'0',marginTop:'24px'}}>


              {/* search bar (mui) */}
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 346,backgroundColor:'#f4f5f6',boxShadow:'none',height:40 }}
                >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by PSN, Model, Chassis"
                    inputProps={{ 'aria-label': 'Search by PSN, Model, Chassis' }}
                    onChange={(e) => {setSearchTerm_1(e.target.value); setDefectPage(0);}}
                    value={searchTerm_1}
                />  
                </Paper>

                <div className='overview_search_sort'>
                <div className='overview_search_sort_inner' onClick={handleSortClick}>
                  <p>Sort</p>
                  <img src={Sort} alt='sort' style={{width:'20px',height:'20px'}} />
                </div>
                {sort && <div className='sort_sub_div'>
                  <p onClick={ () =>{
                    handleSorting('Ascending');
                    handleSortClick();
                  }
                } style={{color: sortType == 'Ascending' && '#395DAB' }}>Sort Ascending(Time)</p>
                  <p onClick={ () =>{
                    handleSorting('Descending');
                    handleSortClick();
                  }
                } style={{color: sortType == 'Descending' && '#395DAB' }}>Sort Descending(Time)</p>
                </div>}
              </div>
            </div>

            <div className='overview-table-container'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>PSN</th>
                    <th>MODEL</th>
                    <th>CHASSIS NO</th>
                    <th>PART TYPE</th>
                    <th>SHIFT</th>
                    <th>DATE & TIME</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                {loader ? (
                  <tbody>
                    <tr>
                      <td align="center" colSpan={8}>
                        <LoadSpinner height='100%' />
                      </td>
                    </tr>
                  </tbody>
                ) : filteredData_1?.length ? (
                  <>
                    <tbody>
                      {filteredData_1?.slice(defectPage * 5, (defectPage + 1) * 5).map((data, index) => {
                        return (
                          <tr key={index} className='tr-light'>
                           <td>{data?.PSN}</td>
                            <td style={{color:'#395DAB',fontWeight:'600',cursor:'pointer'}} >{data?.Model}</td>
                            <td>{data?.ChassisNumber}</td>
                            <td>{data?.PartTypes}</td>
                            <td>{data?.Shift}</td>
                            <td>
                                    {data?.datetime && (() => {
                                      // Parse the timestamp string into a Date object
                                      let timestamp = new Date(data.datetime);

                                      // Add 5 hours and 30 minutes to the timestamp
                                      timestamp.setHours(timestamp.getHours() + 5);
                                      timestamp.setMinutes(timestamp.getMinutes() + 30);

                                      // Format the adjusted timestamp into the desired format (YYYY-MM-DDTHH:mm:ss)
                                      let adjustedTimestamp = timestamp.toISOString();
                                      
                                       // Remove the ".00Z" at the end
                                      adjustedTimestamp = adjustedTimestamp.slice(0, -5);
  
                                      // Split the adjusted timestamp into date and time components
                                      let [date, time] = adjustedTimestamp.split("T");

                                      // Return the formatted date and time
                                      return `${date} ${time}`;
                                    })()}
                          </td>

                            <td>
                              {/* <div className='overview_status'>

                                <p style={{fontWeight:'500',fontSize:'14px',lineHeight:'20px',letterSpacing:'1%'}}>{true ? "Failed" : "Success"}</p>
                              </div> */}
                              {resultMapping[data?.Result]}
                            </td>
                            <td style={{color:'#395DAB',fontWeight:'600',cursor:'pointer'}}>
                            <a href={`/inspection/overview/${JSON.stringify(data)}`} target="_blank" style={{textDecoration:'none',color:'#395DAB'}}> View Details</a> 
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <td colSpan={8} style={{padding:'0px'}}>
                        <div className='tfoot'>
                          <p style={{fontSize:'14px',fontWeight:'500',lineHeight:'20px',letterSpacing:'1%',color:'#A0A8B0'}}>Page {defectPage + 1} of {Math.ceil(filteredData_1.length / 5)}</p>
                          <div className='paginated_right'>
                            {defectPage === 0 ? <ChevronLeftIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronLeftIcon onClick={() => handleDefectPageChange(defectPage - 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                            {Array.from({ length: Math.ceil(filteredData_1.length / 5) }).map((_, index) => {
                              // Calculate the start and end pages for the current group of 5 pages
                              const startPage = Math.floor(defectPage / 5) * 5; // Calculate the start page of the current group
                              const endPage = Math.min(startPage + 4, Math.ceil(filteredData_1.length / 5) - 1); // Calculate the end page of the current group
                              
                              // Render page numbers within the current group
                              if (index >= startPage && index <= endPage) {
                                return (
                                  <div className={index === defectPage ? 'pagenum' : 'pagenum1'} key={index} onClick={() => handleDefectPageChange(index)}>
                                    <p>{index + 1}</p>
                                  </div>
                                );
                              }
                              // Render null for page numbers outside the current group
                              return null;
                            })}
                            {defectPage + 1 === Math.ceil(filteredData_1.length / 5) ? <ChevronRightIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronRightIcon onClick={() => handleDefectPageChange(defectPage + 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                          </div>
                        </div>
                      </td>
                    </tfoot>
                  </>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={8}>
                        <h2 style={{textAlign:'center'}}>No Data</h2>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <div className='dashboard_content_1'>
          <div className='overview'>
            <div className='overview_head' style={{justifyContent:'flex-start'}}>
              <div className='overview_head_div'>
              </div>
              <p className='overview_head_text'>Uninspected ({filteredData_2.length})</p>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:'0px',flexGrow:'0',marginTop:'24px'}}>


              {/* search bar (mui) */}
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 346,backgroundColor:'#f4f5f6',boxShadow:'none',height:40 }}
                >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by PSN, Model, Chassis"
                    inputProps={{ 'aria-label': 'Search by PSN, Model, Chassis' }}
                    onChange={(e) => {setSearchTerm_2(e.target.value); setUninspectedPage(0);}}
                    value={searchTerm_2}
                />  
                </Paper>

                <div className='overview_search_sort'>
                <div className='overview_search_sort_inner' onClick={handleSortClick}>
                  <p>Sort</p>
                  <img src={Sort} alt='sort' style={{width:'20px',height:'20px'}} />
                </div>
                {sort && <div className='sort_sub_div'>
                  <p onClick={ () =>{
                    handleSorting('Ascending');
                    handleSortClick();
                  }
                } style={{color: sortType_2 == 'Ascending' && '#395DAB' }}>Sort Ascending(Time)</p>
                  <p onClick={ () =>{
                    handleSorting('Descending');
                    handleSortClick();
                  }
                } style={{color: sortType_2 == 'Descending' && '#395DAB' }}>Sort Descending(Time)</p>
                </div>}
              </div>
            </div>

            <div className='overview-table-container'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>PSN</th>
                    <th>MODEL</th>
                    <th>CHASSIS NO</th>

                    <th>SHIFT</th>
                    <th>DATE & TIME</th>
                    
                  </tr>
                </thead>
                {loader ? (
                  <tbody>
                    <tr>
                      <td align="center" colSpan={8}>
                        <LoadSpinner height='100%' />
                      </td>
                    </tr>
                  </tbody>
                ) : filteredData_2?.length ? (
                  <>
                    <tbody>
                      {filteredData_2?.slice(uninspectedPage * 5, (uninspectedPage + 1) * 5).map((data, index) => {
                        return (
                          <tr key={index} className='tr-light'>
                           <td>{data?.PSN}</td>
                            <td style={{color:'#395DAB',fontWeight:'600',cursor:'pointer'}} >{data?.Model}</td>
                            <td>{data?.ChassisNumber}</td>
                         
                            <td>{data?.Shift}</td>
                            <td>
                                    {data?.datetime && (() => {
                                      // Parse the timestamp string into a Date object
                                      let timestamp = new Date(data.datetime);

                                      // Add 5 hours and 30 minutes to the timestamp
                                      timestamp.setHours(timestamp.getHours() + 5);
                                      timestamp.setMinutes(timestamp.getMinutes() + 30);

                                      // Format the adjusted timestamp into the desired format (YYYY-MM-DDTHH:mm:ss)
                                      let adjustedTimestamp = timestamp.toISOString();
                                      
                                       // Remove the ".00Z" at the end
                                      adjustedTimestamp = adjustedTimestamp.slice(0, -5);
  
                                      // Split the adjusted timestamp into date and time components
                                      let [date, time] = adjustedTimestamp.split("T");

                                      // Return the formatted date and time
                                      return `${date} ${time}`;
                                    })()}
                          </td>

                       
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <td colSpan={6} style={{padding:'0px'}}>
                        <div className='tfoot'>
                          <p style={{fontSize:'14px',fontWeight:'500',lineHeight:'20px',letterSpacing:'1%',color:'#A0A8B0'}}>Page {uninspectedPage + 1} of {Math.ceil(filteredData_2.length / 5)}</p>
                          <div className='paginated_right'>
                            {uninspectedPage === 0 ? <ChevronLeftIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronLeftIcon onClick={() => handleUninpspectedPageChange(uninspectedPage - 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                            {Array.from({ length: Math.ceil(filteredData_2.length / 5) }).map((_, index) => {
                              // Calculate the start and end pages for the current group of 5 pages
                              const startPage = Math.floor(uninspectedPage / 5) * 5; // Calculate the start page of the current group
                              const endPage = Math.min(startPage + 4, Math.ceil(filteredData_2.length / 5) - 1); // Calculate the end page of the current group
                              
                              // Render page numbers within the current group
                              if (index >= startPage && index <= endPage) {
                                return (
                                  <div className={index === uninspectedPage ? 'pagenum' : 'pagenum1'} key={index} onClick={() => handleUninpspectedPageChange(index)}>
                                    <p>{index + 1}</p>
                                  </div>
                                );
                              }
                              // Render null for page numbers outside the current group
                              return null;
                            })}
                            {uninspectedPage + 1 === Math.ceil(filteredData_2.length / 5) ? <ChevronRightIcon style={{ opacity: 0.2, cursor: 'not-allowed' }} /> : <ChevronRightIcon onClick={() => handleUninpspectedPageChange(uninspectedPage + 1)} style={{ cursor: 'pointer',color:'#707784' }} />}
                          </div>
                        </div>
                      </td>
                    </tfoot>
                  </>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <h2 style={{textAlign:'center'}}>No Data</h2>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div> 

      {/* Dialog for note */}
      <Dialog open={dashboardALert} onClose={() => setDashboardAlert(false)}  
        PaperProps={{
        style: {
          background:  '#ffffff' ,
        },
      }}>
        <DialogTitle sx={{color:'#FF5630',fontSize:'24px',fontWeight:'bold'}}>Note!!!</DialogTitle>
        <DialogContent>
          <Typography sx={{color:'#101623',fontSize:'20px'}}>Date field can't be empty.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDashboardAlert(false)} color="primary" sx={{fontWeight:'bold',fontSize:'18px'}} variant='contained'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
