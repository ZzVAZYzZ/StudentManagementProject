import Moon from '../img/Moon.png';
import Sun from '../img/Sun.png';
import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Select } from 'antd';
import './css/body.css';


const { Option } = Select;

function Body() {
  const [isHoveredButton, setIsHoveredButton] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [findArray,setFindArray] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  const [mainColor, setMainColor] = useState('#273C75'); // Màu chủ đạo
  const [subColor, setSubColor] = useState('#7F8FA6'); // Màu phụ
  const [background, setBackground] = useState('#DCDDE1'); // Màu background
  const [currentImage, setCurrentImage] = useState(Moon);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeChange = () => {
    // Đảo ngược trạng thái của theme khi ấn vào button
    setIsDarkTheme((prevTheme) => !prevTheme);
  
    // Cập nhật màu chủ đạo và màu phụ dựa trên trạng thái mới
    setMainColor(isDarkTheme ? '#273C75' : '#333');
    setSubColor(isDarkTheme ? '#7F8FA6' : '#95afc0');
    setBackground(isDarkTheme ? '#DCDDE1' : '#c7ecee');
    setCurrentImage(isDarkTheme ? Moon : Sun);
  };

  useEffect(() => {
    if (selectedOption === 'id') {
      // Sắp xếp apiData theo trường sid
      const sortedData = [...apiData].sort((a, b) => a.sid - b.sid);
      setApiData(sortedData);
    }
    if (selectedOption === 'gpa') {
      // Sắp xếp apiData theo trường gpa
      const sortedData = [...apiData].sort((a, b) => a.gpa - b.gpa);
      setApiData(sortedData);
    }
    if (selectedOption === 'firstName') {
      // Sắp xếp apiData theo trường firstName
      const sortedData = [...apiData].sort((a, b) => a.firstName.localeCompare(b.firstName));
      setApiData(sortedData);
    }
    if (selectedOption === 'default') {
      // Sắp xếp apiData quay về default
      setApiData(defaultData);
    }
  }, [selectedOption, apiData]);

  const handleOptionChange = (value) => {
    // Xử lý khi lựa chọn thay đổi
    setSelectedOption(value);
  };

  const handlePrintAllClick = () => {
    setFindArray([]); // Đặt lại findArray về mảng rỗng
    setSelectedRadio(null); // Bỏ chọn radio button
    setInputValue(''); // Đặt lại giá trị của input về trống
    // Cập nhật dataSource với dữ liệu ban đầu
    setApiData(apiData); // Nếu có thay đổi tên biến khác, hãy sử dụng tên biến đó
  };


  const handleAddNewStudentClick = () => {
    const sid = document.getElementById('studentID').value;
      const newStudent = {
        sid,
        lastName: document.getElementById('studentLastName').value,
        firstName: document.getElementById('studentFirstName').value,
        major: document.getElementById('studentMajor').value,
        gpa: document.getElementById('studentGpa').value,
      };
      console.log(newStudent);
      const url = 'http://localhost:8080/pushToFrontEndApi/addStudentArray';
      // Sử dụng hàm fetch để gửi dữ liệu lên server
      fetch(url, {
        method: 'POST', // Phương thức HTTP POST để gửi dữ liệu
        headers: {
          'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(newStudent), // Chuyển đối tượng newStudent thành chuỗi JSON
      })
      .then(response => response.json())
      .catch(error => console.error('Lỗi khi gửi dữ liệu lên backend:', error));
  };

  const handleSaveFileClick = () => {
    const saveToken = true;
      const url = 'http://localhost:8080/pushToFrontEndApi/saveStudentArray';
      // Sử dụng hàm fetch để gửi dữ liệu lên server
      fetch(url, {
        method: 'POST', // Phương thức HTTP POST để gửi dữ liệu
        headers: {
          'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(saveToken), // Chuyển đối tượng newStudent thành chuỗi JSON
      })
      .then(response => response.json())
      .catch(error => console.error('Lỗi khi gửi dữ liệu lên backend:', error));
  };

  const handleDeleteStudentClick = () => {
    const sid = document.getElementById('studentID').value;
      const deleteStudent = sid;
      const url = 'http://localhost:8080/pushToFrontEndApi/deleteStudentArray';
      // Sử dụng hàm fetch để gửi dữ liệu lên server
      fetch(url, {
        method: 'POST', // Phương thức HTTP POST để gửi dữ liệu
        headers: {
          'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(deleteStudent), // Chuyển đối tượng newStudent thành chuỗi JSON
      })
      .then(response => response.json())
      .catch(error => console.error('Lỗi khi gửi dữ liệu lên backend:', error));
  };

  const handleUpdateStudentClick = () => {
    const sid = document.getElementById('studentID').value;
      const updateStudent = {
        sid,
        lastName: document.getElementById('studentLastName').value,
        firstName: document.getElementById('studentFirstName').value,
        major: document.getElementById('studentMajor').value,
        gpa: document.getElementById('studentGpa').value,
      };
      console.log(updateStudent);
      const url = 'http://localhost:8080/pushToFrontEndApi/updateStudentArray';
      // Sử dụng hàm fetch để gửi dữ liệu lên server
      fetch(url, {
        method: 'POST', // Phương thức HTTP POST để gửi dữ liệu
        headers: {
          'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(updateStudent), // Chuyển đối tượng newStudent thành chuỗi JSON
      })
      .then(response => response.json())
      .catch(error => console.error('Lỗi khi gửi dữ liệu lên backend:', error));
  };

  const handleLoadClick = async () => {
    const url = 'http://localhost:8080/pushToFrontEndApi/getStudentArray';
  
    fetch(url).then(resp => resp.json())
    .then(apiData => {
      setApiData(apiData);
      setDefaultData(apiData);
      console.log(apiData);
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu từ backend:', error));
  };

  const handleRefreshClick = async () => {
    const url = 'http://localhost:8080/pushToFrontEndApi/refreshStudentArray';
  
    fetch(url).then(resp => resp.json())
    .then(apiData => {
      setApiData(apiData);
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu từ backend:', error));
  };


  
  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  useEffect(() => {
    if (selectedRadio !== null) {
      console.log(`Selected Radio: ${selectedRadio}`);
    }
  }, [selectedRadio]);

  const [isHoveredInput, setIsHoveredInput] = useState({
    studentID: false,
    lastName: false,
    firstName: false,
    major: false,
    gpa: false,
  });

  const dataSource = apiData.map(item => ({
    ...item,
    key: item.sid.toString(), // Sử dụng giá trị của 'sid' làm key
  }));

  const handleMouseEnterButton = () => {
    setIsHoveredButton(true);
  };

  const handleMouseLeaveButton = () => {
    setIsHoveredButton(false);
  };

  const handleMouseEnterInput = (inputKey) => {
    setIsHoveredInput((prev) => ({ ...prev, [inputKey]: true }));
  };

  const handleMouseLeaveInput = (inputKey) => {
    setIsHoveredInput((prev) => ({ ...prev, [inputKey]: false }));
  };

  const handleInputChange = (e) => {
  
    if (selectedRadio === 'findID' && e.target.id==='findInputID') {
      setInputValue(e.target.value);
    } else if (selectedRadio === 'findMajor' && e.target.id==='findInputMajor') {
      setInputValue(e.target.value);
    }
  };

  const findStudentById = (id) => {
    const foundStudent = apiData.find(student => student.sid === parseInt(id));
    return foundStudent;
  };

  const findStudentByMajor = (major) => {
    const normalizedMajor = major.toLowerCase(); // Chuyển đổi ngành cần tìm kiếm thành chữ thường
    const foundStudents = apiData.filter(student => student.major.toLowerCase().includes(normalizedMajor));
    return foundStudents;
  };

  const handleFindIDMajorClick = () => {
    if (selectedRadio === 'findID') {
      const foundStudent = findStudentById(inputValue);
      setFindArray(foundStudent ? [foundStudent] : []); 
      if (foundStudent) {
        console.log('Student found:', foundStudent);
        
      } else {
        console.log('Student not found');
      }
    } else if (selectedRadio === 'findMajor') {
      const foundStudentsByMajor = findStudentByMajor(inputValue);
      setFindArray(foundStudentsByMajor);
      if (foundStudentsByMajor.length > 0) {
        console.log('Students found:', foundStudentsByMajor);
        
      } else {
        console.log('No students found');
      }
    }
  };

  useEffect(() => {
    if (selectedRadio === 'findID') {
      const value = document.getElementById('findInputID').value;
      setInputValue(value);
    }else if (selectedRadio === 'findMajor'){
      const value = document.getElementById('findInputMajor').value;
      setInputValue(value);
    }
  }, [selectedRadio]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sid',
      key: 'sid',
    },
    {
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LAST NAME',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'MAJOR',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
    },
  ];
  useEffect(()=>{
    console.log(apiData);
  },[apiData])
  return (
    <div className='body' style={{
      backgroundColor: background
    }}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginLeft: '100px' }}>
          <img src={currentImage} alt="Theme Image" style={{ width: '200px', height: '200px', padding: '20px' }} />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: '100px',
            }}
          >
            <div
              style={{
                color: mainColor,
                fontWeight: '700',
                width: '75px',
                height: '50px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2em',
              }}
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
            >
              Theme:
            </div>
            <Button
              style={{
                fontFamily: 'Mali',
                color: isHoveredButton ? subColor :  mainColor,
                fontWeight: '700',
                width: '200px',
                height: '50px',
                border: `2px solid ${isHoveredButton ? subColor :  mainColor}`,
              }}
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
              onClick={handleThemeChange}
            >
              Moon Sight
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '45%', padding: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '50px',marginLeft:'50px' }}>
              <div style={{ width: '120px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'1.2em', fontWeight:'700', color:mainColor }}>Student ID:</div>
              <Input
                onMouseEnter={() => handleMouseEnterInput('studentID')}
                onMouseLeave={() => handleMouseLeaveInput('studentID')}
                style={{ width: '150px', border: `2px solid ${isHoveredInput.studentID ? mainColor : subColor}` }}
                id='studentID'
              />
              
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '50px',marginLeft:'50px' }}>
              <div style={{ width: '120px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'1.2em', fontWeight:'700', color:mainColor }}>Last Name:</div>
              <Input
                onMouseEnter={() => handleMouseEnterInput('lastName')}
                onMouseLeave={() => handleMouseLeaveInput('lastName')}
                style={{ width: '150px', border: `2px solid ${isHoveredInput.lastName ? mainColor : subColor}` }}
                id='studentLastName'
              />
              <div style={{ width: '120px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'1.2em', fontWeight:'700', color:mainColor }}>First Name:</div>
              <Input
                onMouseEnter={() => handleMouseEnterInput('firstName')}
                onMouseLeave={() => handleMouseLeaveInput('firstName')}
                style={{ width: '150px', border: `2px solid ${isHoveredInput.firstName ? mainColor : subColor}` }}
                id='studentFirstName'
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:'50px' }}>
              <div style={{ width: '120px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'1.2em', fontWeight:'700', color:mainColor }}>Major:</div>
              <Input
                onMouseEnter={() => handleMouseEnterInput('major')}
                onMouseLeave={() => handleMouseLeaveInput('major')}
                style={{ width: '150px', border: `2px solid ${isHoveredInput.major ? mainColor : subColor}` }}
                id='studentMajor'
              />
              <div style={{ width: '120px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'1.2em', fontWeight:'700', color:mainColor }}>GPA:</div>
              <Input
                onMouseEnter={() => handleMouseEnterInput('gpa')}
                onMouseLeave={() => handleMouseLeaveInput('gpa')}
                style={{ width: '150px', border: `2px solid ${isHoveredInput.gpa ? mainColor : subColor}` }}
                id='studentGpa'
              />
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', margin:'50px 0'}}>
              <Button
                style={{ marginRight: '50px', fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px', height:'50px',fontSize:'1.2em' }}
                onClick={handleAddNewStudentClick}
              >ADD</Button>
              <Button 
                style={{ marginRight: '50px', fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px', height:'50px',fontSize:'1.2em' }}
                onClick={handleUpdateStudentClick}
              >
                UPDATE</Button>
              <Button 
                style={{ fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px', height:'50px',fontSize:'1.2em'}}
                onClick={handleDeleteStudentClick}   
              >
                DELETE</Button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '55%', padding: '25px' }}>
            <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
              <div style={{display:'flex',flexDirection:'column',width:'40%'}}>
                <div style={{display:'flex', flexDirection:'row', border:`1px solid ${subColor}`, marginBottom:'20px',alignItems:'center',background:'#fff',height:'50px', padding:'5px',fontWeight:'700'}}>
                  <div style={{color:mainColor, fontWeight:'700'}}>ID:</div>
                  <Input 
                    style={{border:"none", color:subColor,fontWeight:'700'}}
                    onChange={handleInputChange}
                    id='findInputID'
                  />
                  <input
                    type="radio"
                    value="findID"
                    checked={selectedRadio === 'findID'}
                    onChange={handleRadioChange}
                  />
                </div>
                <div style={{display:'flex', flexDirection:'row', border:`1px solid ${subColor}`,alignItems:'center',background:'#fff',height:'50px', padding:'5px',fontWeight:'700'}}>
                  <div style={{color:mainColor, fontWeight:'700'}}>Major:</div>
                  <Input 
                    style={{border:"none", color:subColor,fontWeight:'700'}}
                    onChange={handleInputChange}
                    id='findInputMajor'
                  />
                  <input
                    type="radio"
                    value="findMajor"
                    checked={selectedRadio === 'findMajor'}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>
              <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center', padding:'5px'}}>
                <Button 
                  style={{ width:'100px', height:'100px', color:mainColor, fontWeight:'700'}}
                  onClick={handleFindIDMajorClick}
                >FIND</Button>
              </div>
              <div style={{display:'flex', flexDirection:'column', width:"40%"}}>
                <div style={{display:'flex', flexDirection:'row',marginLeft:'auto',height:'50px', padding:'5px',marginBottom:'20px'}}>
                  <Button 
                    style={{ fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%'}}
                    onClick={handleSaveFileClick}
                  >
                    SAVE
                  </Button>
                </div>
                <div style={{display:'flex', flexDirection:'row',marginLeft:'auto',height:'50px', padding:'5px',alignItems:'center'}}>
                  <div style={{width:'75px',color:mainColor,fontWeight:'700'}}>Sort By:</div>
                  
                  <Select
                    style={{ width: '100px', fontSize: '1.2em', height: '100%', fontFamily:'Mali' ,color:mainColor, fontWeight:'700' }}
                    placeholder="Choose"
                    onChange={handleOptionChange}
                    value={selectedOption}
                  >
                    <Option value="id">ID</Option>
                    <Option value="gpa">GPA</Option>
                    <Option value="firstName">First Name</Option>
                    <Option value="default">Default</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div>
            <Table dataSource={findArray.length > 0 ? findArray : dataSource} columns={columns} scroll={{ y: 160 }} pagination={false} style={{ marginTop: '20px', border:`1px solid ${subColor}` }} />
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
            <div style={{ width: '100%' }}>
              <div style={{width:'55%',marginLeft:'auto'}}>
                <div style={{padding:'25px', display:'flex', flexDirection:'row'}}>
                  <div>
                    <Button 
                      style={{ fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px',fontSize:'1em',height:'100%'}}  
                      onClick={handlePrintAllClick}
                    >
                      PRINT ALL
                    </Button>
                  </div>
                  <div style={{marginLeft:'auto'}}>
                    <Button 
                      style={{ fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%',marginRight:'20px'}}
                      onClick={handleRefreshClick}
                    >REFRESH</Button>
                    <Button 
                      style={{ fontFamily:'Mali', color:mainColor, fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%'}}
                      onClick={handleLoadClick}
                    >LOAD</Button>
                  </div>
                </div>
                
              </div>
            </div>
      </div>
    </div>
  );
}

export default Body;
