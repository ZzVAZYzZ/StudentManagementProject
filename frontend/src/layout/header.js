function Header() {
    return (
      <div className='header'>
          <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'center',color:'#273C75',fontSize:'1.5em',fontWeight:'700',textShadow:'0 0 10px #dff9fb,0 0 20px #dff9fb, 0 0 40px #dff9fb,0 0 80px #dff9fb,0 0 120px #dff9fb' }}>STUDENT MANAGEMENT</div>
            <div style={{ marginRight: '50px', background:'#fff',width:'50px',height:'50px',fontSize:'1.5em', border:'1px solid #333',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems: 'center',cursor: 'pointer',fontWeight:'700' }}>?</div>
          </div>
      </div>
    );
  }
  
  export default Header