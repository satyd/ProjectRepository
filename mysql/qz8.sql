SELECT name
FROM upludok.user INNER JOIN upludok.post
ON upludok.post.user_id = upludok.user.user_id
WHERE DATE(created_at) = CURDATE()
GROUP BY user.user_id
HAVING COUNT(post_id) > 3;