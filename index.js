/**
 *
 * Copyright 2017 Yoshihiro Tanaka
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Yoshihiro Tanaka <contact@cordea.jp>
 * date  : 2017-09-09
 */

const config = require('./config.json');
const functions = require('googleapis');
const twitter = require('twitter');

exports.tweet = function tweet(req, res) {
    const message = req.body.head_commit.message;
    const params = {
        status: message
    };

    const client = getClient();
    client.post('statuses/update', params, function(error, tweet, response) {
        if (error) {
            console.log(error);
            if (error.length > 0) {
                res.status(error[0].code).send(error[0].message);
            } else {
                res.status(400).send('Bad request');
            }
            return;
        }
        res.status(200).send(tweet.text);
    });
}

function getClient() {
    return new twitter({
        consumer_key: config.CONSUMER_KEY,
        consumer_secret: config.CONSUMER_SECRET,
        access_token_key: config.ACCESS_TOKEN_KEY,
        access_token_secret: config.ACCESS_TOKEN_SECRET
    });
}
