class UserState{
    User;
    constructor(user)
    {
        this.User=user;
    }
    SignUp(user)
    {
        this.User=user;
    }
    SignOut()
    {
        document.getElementById("logup").textContent="Sign Up";
        document.querySelector("img.header-user-image").src="res/images/User.png";
        document.querySelector("p.username").textContent="Username";
    }
    SignIn(user)
    {
        document.getElementById("logup").textContent="Sign Out";
        if(user.image!=undefined)
            {
                document.querySelector("img.header-user-image").src=user.image;
            }
        console.log(document.querySelector("p.username"));
        document.querySelector("p.username").textContent=user.username;
        document.querySelectorAll('div>section.postheader>p.author');
    }
}
