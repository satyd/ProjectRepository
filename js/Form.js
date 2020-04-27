class PostForm {

    _postCollection= new postArray([]);
    size;
    _postForm;

    constructor(postCollection=[]) {
        //this._postCollection = new postArray(postCollection);
        this.size=0;
        this._postForm = document.createElement('div');
        this._postForm.classList.add('post');
        this._postForm.innerHTML = `
			<section class="postheader" >
                <button class="userpost">
                    <img class="userimg imgwrap" alt="">
                </button>
                
                <p class="author"></p>
                <p class="datetime"></p>
                <button class="nobg editshare">
                    <img class="editshare" src="res/images/edit.png" alt="">
                </button><br/>
                <section class="hashTags">
                    
                <section class="id"></section>
                </section>
            </section>
            <p class="posttext"></p>
            <button class="nobg">
                <img class="contents contentimg" alt="" />
            </button>
            <section class="postfooter">
                <button class="nobg">
                    <img class="points pstyle" src="res/images/_upvote.png" alt="">
                </button>
                <p class="pointz"></p>
                <button class="nobg">
                    <img class="points pstyle"src="res/images/downvote.png" alt="">
                </button>
                <button class="nobg">
                    <img class="comment" src="res/images/comment.png" alt="">
                </button>
                <button class="nobg editshare">
                    <img class="editshare" src="res/images/share.png" alt="">
                </button>
            </section>
`;
    }

    ShowPostsFeed(postsFilling){
        let main = document.querySelector('section.posts');
        
        //let main = document.querySelector("main");

        for(let i = 0; i < postsFilling.length; i++) {

            let postForm = this._postForm.cloneNode(true);

            if (!this._postCollection.add(postsFilling[i])) {
                return false;
            }
        }
        this.size+=postsFilling.length;
        let postsToShow = this._postCollection.getPage(0,postsFilling.length);
        console.log(this.size);
        for(let i = 0; i < postsFilling.length; i++){

            let postForm = this._postForm.cloneNode(true);

            postForm.id = postsToShow[i].id;
            postForm.getElementsByClassName("userimg").item(0).src=postsToShow[i].photoLink;
            postForm.getElementsByClassName("contentimg").item(0).src=postsToShow[i].contentLink;
            postForm.getElementsByClassName("author").item(0).textContent=postsToShow[i].author+",";
            postForm.getElementsByClassName("datetime").item(0).textContent = postsToShow[i].createdAt.getDay().toString() + "." + postsToShow[i].createdAt.getMonth().toString() + "."
                + postsToShow[i].createdAt.getFullYear().toString() + " " + postsToShow[i].createdAt.getHours().toString() + ":" + postsToShow[i].createdAt.getMinutes().toString();
            postForm.getElementsByClassName("posttext").item(0).textContent=postsToShow[i].description;
            postForm.getElementsByClassName("pointz").item(0).textContent=String(postsToShow[i].points);
            postForm.getElementsByClassName("id").item(0).className='id'+postForm.id;
            

            main.insertBefore(postForm, document.getElementById("updateButton"));
            let tags=document.querySelector('section.id'+postForm.id);
            console.log(tags);
            if(postsToShow[i].hashTags.length===0){

                postForm.removeChild(postForm.getElementsByClassName("hashTags").item(0));
            }else{
                for(let j=0;j<postsToShow[i].hashTags.length;j++){
                    let tag=document.createElement("button",postsToShow[i].hashTags[j]);
                    tag.className = "tags";
                    tag.textContent=postsToShow[i].hashTags[j];
                    tags.insertBefore(tag,tags.firstChild);
                } 
                
            }

            
        }
    }
    Login(user)
    {
        let img=document.querySelector("img.header-user-image");
        img.src=user.image;
        let username=document.querySelector("p.username");
        username.textContent=user.username;
    }
    add(postFilling) {

        if (!this._postCollection.add(postFilling)) {
            return false;
        }
        
        let lastcreated=this.size;
        
        let main = document.querySelector('section.posts');

        let postToShow = this._postCollection.get(postFilling.id);

        let postForm = this._postForm.cloneNode(true);

        postForm.id = postToShow.id;
        postForm.getElementsByClassName("userimg").item(0).src=postToShow.photoLink;
        postForm.getElementsByClassName("contentimg").item(0).src=postToShow.contentLink;
        postForm.getElementsByClassName("author").item(0).textContent=postToShow.author+",";
        postForm.getElementsByClassName("datetime").item(0).textContent = postToShow.createdAt.getDay().toString() + "." + postToShow.createdAt.getMonth().toString() + "."
            + postToShow.createdAt.getFullYear().toString() + " " + postToShow.createdAt.getHours().toString() + ":" + postToShow.createdAt.getMinutes().toString();
        postForm.getElementsByClassName("posttext").item(0).textContent=postToShow.description;
        postForm.getElementsByClassName("pointz").item(0).textContent=String(postToShow.points);
        postForm.getElementsByClassName("id").item(0).className='id'+postForm.id;
        console.log(postForm.getElementsByClassName('id'+postForm.id).item(0).className);
        
        main.insertBefore(postForm, main.firstChild);
        let tags=document.querySelector('section.id'+postForm.id);
        console.log(tags);
        if(postToShow.hashTags.length===0){

            postForm.removeChild(postForm.getElementsByClassName("hashTags").item(0));
        }else{
            for(let j=0;j<postToShow.hashTags.length;j++){
                let tag=document.createElement("button",postToShow.hashTags[j]);
                tag.className = "tags";
                tag.textContent=postToShow.hashTags[j];
                tags.insertBefore(tag,tags.firstChild);
            } 
            
        }
        return true;
    }

    Remove(id) {

        if (!this._postCollection.remove(id)) {
            return false;
        }

        let main = document.querySelector("section.posts");
        main.removeChild(document.getElementById(id));
        
        return true;
    }

    Edit(id, postFilling) {

        if (!this._postCollection.edit(id, postFilling)) {
            return false;
        }

        let postForm = document.getElementById(id);
        console.log(postForm);
        postForm.getElementsByClassName("posttext").item(0).textContent=postFilling.description;
        
        postForm.getElementsByClassName("contentimg").item(0).src=postFilling.contentLink;
        postForm.getElementsByClassName("id"+id).item(0).textContent="";
    
        let tags=document.querySelector('section.id'+postForm.id);
        console.log(tags);
        if(postFilling.hashTags.length===0){
            postForm.removeChild(postForm.getElementsByClassName("hashTags").item(0));
        }else{
            for(let j=0;j<postFilling.hashTags.length;j++){
                let tag=document.createElement("button",postFilling.hashTags[j]);
                tag.className = "tags";
                tag.textContent=postFilling.hashTags[j];
                tags.insertBefore(tag,tags.firstChild);
            } 
            
        }
        return true;
    }
}

