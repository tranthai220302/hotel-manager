import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail1">
      <h1 className="mailTitle">Tiết kiệm thời gian và tiền bạc!</h1>
      <span className="mailDesc">Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Đăng ký</button>
      </div>
    </div>
  )
}

export default MailList