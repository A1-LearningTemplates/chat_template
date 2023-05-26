import axios from "axios";

const Online = ({ user, data, sendNotification, notificationRequest }) => {
  const createNotification = async () => {
    console.log(user, data);
    try {
      const res = await axios.post(`http://localhost:5000/notification/`, {
        sender: data._id,
        receiver: user._id,
      });
      if (res.data.success) {
        console.log(res.data.newNotification);
        const newNotification = {
          ...res.data.newNotification,
          sender: user,
        };
        sendNotification(newNotification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={user._id}
      className="users"
      onClick={() => {
        createNotification(user);
      }}
    >
      <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" />
      <div>
        <p>{user.userName}</p>
        <small>
          online
          {user.newMessage.length > 0 && (
            <span className="new_message">{user.newMessage.length}</span>
          )}
        </small>
      </div>
      {notificationRequest?.some((ele) => ele._id === user._id) && (
        <div className="user_requested">
          <small>Waiting</small>
        </div>
      )}
    </div>
  );
};

export default Online;
