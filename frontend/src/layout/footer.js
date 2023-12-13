import {Button} from 'antd'

function Footer() {
    return (
      <div className='footer'>
            <div style={{ width: '100%' }}>
              <div style={{width:'55%',marginLeft:'auto'}}>
                <div style={{padding:'25px', display:'flex', flexDirection:'row'}}>
                  <div>
                    <Button style={{ fontFamily:'Mali', color:'#273C75', fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%'}}>PRINT</Button>
                  </div>
                  <div style={{marginLeft:'auto'}}>
                    <Button style={{ fontFamily:'Mali', color:'#273C75', fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%',marginRight:'20px'}}>REFRESH</Button>
                    <Button style={{ fontFamily:'Mali', color:'#273C75', fontWeight:'700',width:'100px',fontSize:'1.2em',height:'100%'}}>LOAD</Button>
                  </div>
                </div>
                
              </div>
            </div>
      </div>
    );
  }
  
  export default Footer