import data from "./data.js";

const { serverTweets, registeredUsers } = data;

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
    res.status(201).send("OK");
    return
}

function tweeting(body, res, userHeader) {
    if (!userHeader || !body.tweet) {
        res.status(400).send("bad request");
        return
    }
    if (typeof userHeader !== "string" || typeof body.tweet !== "string") {
        res.status(400).send("bad request");
        return
    }
    if (!registeredUsers.some((registeredUser) => registeredUser.username === userHeader)) {
        res.status(401).send("UNAUTHORIZED");
        return
    }
    const sendingTweet = {
        username: userHeader,
        tweet: body.tweet
    }
    serverTweets.push(sendingTweet);
    res.status(201).send("OK");
}

function calcTweetsByPage(page) {
    const tweets = serverTweets;
    tweets.reverse();
    const tweetsByPage = [];
    const init = 10 * (page - 1);
    for (let i = init; i <= init + 9; i++) {
        if (tweets[i] === undefined) {
            break;
        }
        tweetsByPage.push(tweets[i]);
    }
    return tweetsByPage
}

function getTweets(res, page) {
    if (serverTweets.length === 0) {
        res.status(200).send([]);
        return
    }
    if (!isNaN(page)) {
        if (page <= 0) {
            res.status(400).send("Informe uma página válida!");
            return
        }
        const tweetsByPage = calcTweetsByPage(page);
        res.status(200).send(tweetsByPage);
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
        res.status(200).send(tweets);
        return
    }
    const lastTenTweets = tweets.slice(-10);
    res.status(200).send(lastTenTweets);
}

function getTweetsByUser(username, res) {
    if (serverTweets.length === 0) {
        res.status(200).send([]);
        return
    }
    const userTweets = serverTweets.filter((serverTweet) => (username === serverTweet.username));
    if (userTweets.length === 0) {
        res.status(200).send([]);
        return
    }
    const tweets = userTweets.map((userTweet) => {
        const userAvatar = registeredUsers.find((registeredUser) => registeredUser.username === userTweet.username).avatar
        return (
            {
                username: userTweet.username,
                avatar: userAvatar,
                tweet: userTweet.tweet
            }
        )
    })
    res.status(200).send(tweets);
    return
}

export default {
    signUp,
    tweeting,
    getTweets,
    getTweetsByUser
}