(function(){
function getPosts(start=0,kolvo=10,filter)
{
    let pek=[];
    if(filter!=undefined){
        let keys=[];
        for(let key in filter)
            keys.push(key);
        for(let i=0;i<posts.length;i++)
        {
            let change=true;
            for(let j=0;j<keys.length;j++)
            {
                if(keys[j]!="hashTags")
                    {
                        if(filter[keys[j]]!=posts[i][keys[j]])
                        {
                            change=false;
                            break;
                        }
                    }
                else{
                        if(Array.isArray(filter[keys[j]]))
                        {
                            for(let k=0;k<filter[keys[j]].length;k++)
                            {
                                if(posts[i].hashTags.indexOf(filter[keys[j]][k])==-1)
                                    change=false;
                            }
                        }
                        else
                        {
                            if(posts[i].hashTags.indexOf(filter[keys[j]])==-1)
                                change=false;
                        }
                    }
            }
            if(change)
                pek.push(posts[i]);
        }
    }
    else
    {
        pek=posts;
    }
    let sorted=[];
    pek.sort(function(a, b) {
        return (a.createdAt<b.createdAt)-(b.createdAt>a.createdAt);
      });
    for(let i=start;i<start+kolvo;i++)
    {
        if(i<pek.length)
        {
            sorted.push(pek[i]);
            //пагинация так должна выглядеть?:
            sorted[i-start].index=i-start+1;
        }
        else
            break;
    }   
    return sorted;
}
let t1_1=getPosts(0,10,{hashTags:["#mytag27","#mytag8"]});
let t1_2=getPosts(0,10);
let t1_3=getPosts(10,7);
let t1_4=getPosts(0,10,{author: 'User21',hashTags:"#mytag0",});

console.log("task1\n с фильтрацией по тегам: в первом и последнем сдучае (##27,8; #0) соответственно");

console.log(t1_1);
console.log(t1_2);
console.log(t1_3);
console.log(t1_4);
function getPost(id)
{
    let i=0;
    while(i<posts.length && posts[i].id!=id)
    {
        i++;
    }
    if(i<posts.length)
        {
            return posts[i];
        }
        else
        {
            return null;   
        }

}
let t2_1=getPost('10');
let t2_2=getPost('22');
console.log("task2");
console.log("id=10");
console.log(t2_1);
console.log("id=22");
console.log(t2_2);

function validatePost(post)
{
    return ((typeof post.id=="string")&&(typeof post.description=="string")&&(typeof post.createdAt=="object")&&(typeof post.author=="string")&&Array.isArray(post.likes)&&Array.isArray(post.dislikes));
}
console.log("validatePost(validatePost(posts[5])):");
console.log(validatePost(posts[5]));
console.log(validatePost(5));
function addPost(post)
{
    if(validatePost(post))
    {
        posts.push(post);
        return true;
    }
    return false;
}
let checkpost={
    id: "47",
    description: 'some added users text',
    author: 'User47',
    photoLink: 'post47.jpg',
    createdAt:date=new Date(),
    
}
console.log("addPost(checkpost={ \nid: '47',\n description: 'some added users text',\nauthor: 'User47',\nphotoLink: 'post47.jpg',\ncreatedAt:date=new Date(),}):");
console.log(addPost(checkpost));
console.log(posts);

/*
что значит перед изменением проверить на валидность?
если post не имеет изменяемых в posts полей, то ничего не изменится,
иначе меняем указанные поля.
Следующая функция возращает ("изменилось ли хоть 1 поле?").
*/
function editPost(id,post)
{
    if(post!=undefined && id<posts.length)
    {
        let i=0;
        while(i<posts.length && posts[i].id!=id)
        {
            i++;
        }
        let changed=false;
        for(let key in post)
            if(key in posts[i])
                {
                    if(key!="hashTags")
                    {
                        if(key !="id" && key!="author"&&key!="createdAt")
                        {
                            posts[i][key]=post[key];
                            changed=true;
                        }
                    }
                    else{
                        //пока что массив тегов просто переинициализируется,
                        //потому что я пока не знаю как обрабатывается запрос пользователя
                        //т.е. непонятно в каком виде он должен получить массив тегов для редактирования
                        posts[i].hashTags.length=0;
                        if(Array.isArray(post[key]))
                        {
                            for(let k=0;k<post[key].length;k++)
                            {
                                posts[i].hashTags.push(post[key][k]);
                            }
                        }
                        else
                        {
                            posts[i].hashTags.push(post[key][k]);
                        }
                    }
                }
        return changed;
    }
    return false;
}
console.log("editPost (11,{author:\"new changed description\"}):");
console.log(editPost(11,{author:"new changed description"}));
console.log(getPost('11'));
console.log("editPost (10,{description:\"new changed description\"}):");
console.log(editPost(10,{description:"new changed description",hashTags:["#myBrandNewTag1","#mySuperNewTag2"]}));
console.log(getPost('10'));

function removePost(id)
{
    if(id<posts.length)
    {
        let i=0;
        while(i<posts.length && posts[i].id!=id)
        {
            i++;
        }
        posts.splice(i,1);
        return true;
    }
    return false;
}
console.log("removePost(7):");
console.log(removePost('7'));
console.log(posts);
//я не очень понял, как добавить обработку лайков в существующие функции, 
//потому просто напишу пару функций

function like(id,user)
{
    
    let i=0;
    while(i<posts.length && posts[i].id!=id)
    {
        i++;
    }
    if(i<posts.length)
    {
        
        posts[i].points++;
        posts[i].likes.push(user);
        return posts[i];
    }
    else
    {
        return null;   
    }
}

function unlike(id,user)
{
    let i=0;
    while(i<posts.length && posts[i].id!=id)
    {
        i++;
    }
    if(i<posts.length)
    {
        posts[i].points--;
        posts[i].likes.splice(posts[i].likes.indexOf(user),1);
        return posts[i];
    }
    else
    {
        return null;   
    }
}
function dislike(id,user)
{
    let i=0;
    while(i<posts.length && posts[i].id!=id)
    {
        i++;
    }
    if(i<posts.length)
    {
        posts[i].points--;
        posts[i].dislikes.push(user);
        return posts[i];
    }
    else
    {
        return null;   
    }
}
function undislike(id,user)
{
    let i=0;
    while(i<posts.length && posts[i].id!=id)
    {
        i++;
    }
    if(i<posts.length)
    {
        posts[i].points++;
        posts[i].dislikes.splice(posts[i].dislikes.indexOf(user),1);
        return posts[i];
    }
    else
    {
        return null;   
    }
}
console.log(validatePost(getPost(10)));
console.log("likes:");
console.log(like(10,"Valera"));
console.log(like(10,"Danil"));
console.log(like(10,"User345"));
console.log(unlike(10,"Danil"));
console.log(dislike(10,"Hatter"));

}());