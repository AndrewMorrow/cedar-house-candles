import axios from 'axios';

const userController = {
  getUser: function() {
    return axios.get(`/api/users/me`);
  },
};

export default userController;
