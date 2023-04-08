import data from "./data.js";

const { localUser, serverTweets, registeredUsers } = data;

function signUp(body, res) {
    if (!body.username || !body.avatar) {
        res.status(400).send("bad request");
        return
    }
    if (typeof body.username !== "string" || typeof body.avatar !== "string") {
        res.status(400).send("bad request");
        return
    }
    if (registeredUsers.some((each) => each.username === body.username)) {
        const user = registeredUsers.find((each) => each.username === body.username)
        user.username = body.username;
        user.avatar = body.avatar;
    } else {
        registeredUsers.push(body);
    }
    localUser.username = body.username;
    localUser.avatar = body.avatar;
    res.status(201).send("OK");
    return
}

function tweeting(body, res) {
    if (!body.username || !body.tweet) {
        res.status(400).send("bad request");
        return
    }
    if (typeof body.username !== "string" || typeof body.tweet !== "string") {
        res.status(400).send("bad request");
        return
    }
    if (!registeredUsers.some((registeredUser) => registeredUser.username === body.username)) {
        res.status(401).send("UNAUTHORIZED");
        return
    }
    const sendingTweet = {
        username: body.username,
        tweet: body.tweet
    }
    serverTweets.push(sendingTweet);
    res.status(200).send("OK");
}

function getTweets(res) {
    if (serverTweets.length === 0) {
        res.send([]);
        return
    }
    const tweets = serverTweets.map((serverTweet) => {
        const userAvatar = registeredUsers.find((registeredUser) => registeredUser.username === serverTweet.username).avatar
        return (
            {
                username: serverTweet.username,
                avatar: userAvatar,
                tweet: serverTweet.tweet
            }
        )
    })
    if (tweets.length <= 10) {
        res.send(tweets);
        return
    }
    const lastTenTweets = tweets.slice(-10);
    res.send(lastTenTweets);
}

export default {
    signUp,
    tweeting,
    getTweets
}