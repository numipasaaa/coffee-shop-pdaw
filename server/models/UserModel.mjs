class UserModel {
    constructor(user) {
        this.username = user.username;
        this.full_name = user.full_name;
        this.email = user.email;
        this.password = user.password;
    }
}
export default UserModel;