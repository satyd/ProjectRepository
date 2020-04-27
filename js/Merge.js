let authorised = new User();
let userimg="res/images/authorized.jpg";
let userid=1;
let username="shizaaa";
authorised.setData(username,userimg,userid);
let twitter = new postArray([]);

let postsinit = [];
for (let i = 0; i < 10; i++) {
    let tags = [];
    let tag = "#mytag" + i;
    for (let k = 0; k < i ** (1 / 2) + 1; k++) {
        tags.push(tag.slice(0, tag.length - 1) + (k ** 3));
    }
    let t = i + 1;
    postsinit[i] = {
        id: String(t),
        description: 'some hamster ' + (t * 3),
        author: 'User' + (21 - t),
        photoLink: 'res/images/user' + (t) + '.jpg',
        contentLink: 'res/images/post' + (t) + '.jpg',
        hashTags: tags,
        points: 0,
        likes: [],
        dislikes: [],
    };
    let date = new Date();
    postsinit[i].createdAt = date;

}
let new_tags=["#nottoday","#kek","#yes i love javascript"];
let new_post = {
    id: "1234",
    description: 'New added post for testing enjoyer ',
    author: 'ME',
    photoLink: 'res/images/usertest' + '.jpg',
    contentLink: 'res/images/testpost' + '.jpg',
    hashTags: new_tags,
    points: 0,
    likes: [],
    dislikes: [],
};
let date = new Date();
new_post.createdAt = date;
twitter.addAll(postsinit);

//twitter.add(new_post);
console.log(twitter);
let mas=new PostForm(twitter);
mas.Login(authorised);
mas.ShowPostsFeed(twitter.posts);
mas.add(new_post);
mas.Remove(5);
let new_tags2=["#editpost","#ilovesoap","#yey"];
let new_post2 = {
    id: "12",
    description: 'Eddited description Post kek',
    author: 'memeMan',
    photoLink: 'res/images/usertest' + '.jpg',
    contentLink: 'res/images/posttest' + '.jpg',
    hashTags: new_tags2,
    points: 0,
    likes: [],
    dislikes: [],
};
let date2 = new Date();
new_post2.createdAt = date2;
mas.Edit(7,new_post2);

