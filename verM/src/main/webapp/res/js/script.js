/* eslint-env node, mocha */
class postArray {
    posts = [];
    constructor(arr) {
        this.posts = arr;
    }

    addAll(arr) {
        for (let i = 0; i < arr.length; i++)
            this.add(arr[i]);
    }
    getPage(start = 0, number = 1, filter) {
        let mas = [];
        if (filter != undefined) {
            let keys = [];
            for (let key in filter)
                keys.push(key);
            for (let i = 0; i < this.posts.length; i++) {
                let change = true;
                for (let j = 0; j < keys.length; j++) {
                    if (keys[j] != "hashTags") {
                        if (filter[keys[j]] != this.posts[i][keys[j]]) {
                            change = false;
                            break;
                        }
                    }
                    else {
                        /*я не вижу как здесь уменьшить число проверок, 
                        чтобы тем самым уменьшить вложенность :(
                        могу разве что поубирать фигурные скобки
                        */
                        if (Array.isArray(filter[keys[j]])) {
                            for (let k = 0; k < filter[keys[j]].length; k++) {
                                if (this.posts[i].hashTags.indexOf(filter[keys[j]][k]) == -1)
                                    change = false;
                            }
                        }
                        else {
                            if (this.posts[i].hashTags.indexOf(filter[keys[j]]) == -1)
                                change = false;
                        }
                    }
                }
                if (change)
                    mas.push(this.posts[i]);
            }
        }
        else {
            mas = this.posts;
        }
        let sorted = [];
        mas.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });
        for (let i = start; i < start + number; i++) {
            if (i < mas.length) {
                sorted.push(mas[i]);
                sorted[i - start].index = i - start + 1;
            }
            else
                break;
        }
        return sorted;
    }
    get(id) {
        return this.posts.find(item => item.id == id);
    }
    static validatePost(post) {
        return ((typeof post.id == "string") && (typeof post.description == "string") && (typeof post.createdAt == "object") && (typeof post.author == "string"));
    }

    add(post) {
        if (postArray.validatePost(post)) {
            this.posts.push(post);
            return true;
        }
        return false;
    }

    edit(id, post) {
        if (post != undefined && id < this.posts.length) {
            let i = this.posts.findIndex(item => item.id == id);
            let changed = false;
            for (let key in post)
                if (key in this.posts[i]) {
                    if (key != "hashTags") {
                        if (key != "id" && key != "author" && key != "createdAt") {
                            this.posts[i][key] = post[key];
                            changed = true;
                        }
                    }
                    else {
                        //пока что массив тегов просто переинициализируется,
                        //потому что я пока не знаю как обрабатывается запрос пользователя
                        //т.е. непонятно в каком виде он должен получить массив тегов для редактирования
                        this.posts[i].hashTags.length = 0;
                        if (Array.isArray(post[key])) {
                            for (let k = 0; k < post[key].length; k++) {
                                this.posts[i].hashTags.push(post[key][k]);
                            }
                        }
                        else {
                            this.posts[i].hashTags.push(post[key][k]);
                        }
                    }
                }
            return changed;
        }
        return false;
    }
    remove(id) {
        if (id < this.posts.length) {
            let i = this.posts.findIndex(item => item.id == id);
            this.posts.splice(i, 1);
            return true;
        }
        return false;
    }
    like(id, user) {

        let i = this.posts.findIndex(item => item.id == id);
        if (i != -1) {

            this.posts[i].points++;
            this.posts[i].likes.push(user);
            return this.posts[i];
        }
        else {
            return null;
        }
    }
    unlike(id, user) {
        let i = this.posts.findIndex(item => item.id == id);
        if (i != -1) {
            this.posts[i].points--;
            this.posts[i].likes.splice(this.posts[i].likes.indexOf(user), 1);
            return this.posts[i];
        }
        else {
            return null;
        }
    }
    dislike(id, user) {
        let i = this.posts.findIndex(item => item.id == id);
        if (i != -1) {
            this.posts[i].points--;
            this.posts[i].dislikes.push(user);
            return this.posts[i];
        }
        else {
            return null;
        }
    }
    undislike(id, user) {
        let i = this.posts.findIndex(item => item.id == id);
        if (i != -1) {
            this.posts[i].points++;
            this.posts[i].dislikes.splice(this.posts[i].dislikes.indexOf(user), 1);
            return this.posts[i];
        }
        else {
            return null;
        }
    }
}

let twitter = new postArray([]);
let postsinit = [];
for (let i = 0; i < 20; i++) {
    let tags = [];
    let tag = "#mytag" + i;
    for (let k = 0; k < i ** (1 / 2) + 1; k++) {
        tags.push(tag.slice(0, tag.length - 1) + (k ** 3));
    }
    let t = i + 1;
    postsinit[i] = {
        id: String(t),
        description: 'some text ' + (t * 3),
        author: 'User' + (21 - t),
        photoLink: 'post' + (t) + '.jpg',
        hashTags: tags,
        points: 0,
        likes: [],
        dislikes: [],
    };
    let date = new Date();
    postsinit[i].createdAt = date;

}
twitter.addAll(postsinit);
/*console.log(twitter.posts[2]["id"]);
console.log(twitter.posts[2]["author"]);*/
console.log(twitter.posts);
let t1_1 = twitter.getPage(0, 10, { hashTags: ["#mytag27", "#mytag8"] });
let t1_2 = twitter.getPage(0, 10);
let t1_3 = twitter.getPage(10, 7);
let t1_4 = twitter.getPage(0, 20, { id: 3, author: 'User18', hashTags: "#mytag8", });

console.log(t1_2);
console.log(t1_3);
console.log("task1\n с фильтрацией по тегам: в первом (##27,8) и втором случае (id=3; User18; #mytag8) ");
console.log(t1_1);
console.log(t1_4);

let t2_1 = twitter.get('10');

console.log("task2");
console.log("id=10");
console.log(t2_1);
console.log("id=22");
console.log(twitter.get('22'));

console.log("validatePost(validatePost(posts[5])):");
console.log(postArray.validatePost(twitter.posts[5]));
console.log(postArray.validatePost(5));

let checkpost = {
    id: "47",
    description: 'some added users text',
    author: 'User47',
    photoLink: 'post47.jpg',
    createdAt: date = new Date(),

}
console.log("addPost(checkpost={ \nid: '47',\n description: 'some added users text',\nauthor: 'User47',\nphotoLink: 'post47.jpg',\ncreatedAt:date=new Date(),}):");
console.log(twitter.add(checkpost));
console.log(twitter.posts);

console.log("editPost (11,{author:\"new changed description\"}):");
console.log(twitter.edit(11, { author: "new changed description" }));
console.log(twitter.get('11'));
console.log("editPost (10,{description:\"new changed description\"}):");
console.log(twitter.edit(10, { description: "new changed description", hashTags: ["#myBrandNewTag1", "#mySuperNewTag2"] }));
console.log(twitter.get('10'));

console.log("removePost(7):");
console.log(twitter.remove('7'));
console.log(twitter.posts);

console.log(postArray.validatePost(twitter.get(10)));
console.log("likes:");
console.log(twitter.like(10, "Valera"));
console.log(twitter.like(10, "Danil"));
console.log(twitter.like(10, "User345"));
console.log(twitter.unlike(10, "Danil"));
console.log(twitter.dislike(10, "Hatter"));
