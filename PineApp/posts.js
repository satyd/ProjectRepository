'use strict';

let posts = [];

for(let i=0;i<20;i++){
    let tags=[];
    let tag="#mytag"+i;
    for( let k=0;k<i**(1/2)+1;k++)
    {
        tags.push(tag.slice(0,tag.length-1)+(k**3));
    }
    posts[i]={
        id: String(i+1),
        description: 'some text '+((i+1)*3),
        
        //как передать сюда в author значение id, вместо (i+1)?
        author: 'User'+(21-i),
        photoLink: 'post'+(i+1)+'.jpg',
        hashTags: tags,
        points: 0,
        likes: [],
        dislikes:[],
    };
    let date=new Date();
    posts[i].createdAt=date;
}
//console.log(posts);
/*for(let i=0;i<6;i++)
{
    alert(posts[i].hashTags.toString());
}*/


