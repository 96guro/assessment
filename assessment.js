'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/*
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
*/
function removeAllChildren(element) {
   while (element.firstChild) {
     // 子どもの要素があるかぎり削除
     element.removeChild(element.firstChild);
   }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren (resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);
  
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren (tweetDivided);
    const anchor = document.createElement('a');
    //const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=あなたのいところ&ref_src=twsrc%5Etfw";
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +  encodeURIComponent('あなたのいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    //anchor.setAttribute('data-text', '診断結果の文章');
    anchor.innerText = 'Tweet #あなたのいところ';      
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
   
};


const answers = [
    '{userName}さんのいいところは声です。{userName}さんの特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は、気になって仕方がないでしょう。',
    '{userName}さんのいいところは情熱です。{userName}さんの情熱に周りの人は感化されます。',
    '{userName}さんのいいところは厳しさです。{userName}さんの厳しさがものごとをいつも成功に導きます。',
    '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。',
    '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。',
    '{userName}さんのいいところは用心深さです。{userName}さんの洞察に、多くの人が助けられます。',
    '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。',
    '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。',
    '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。',
    '{userName}さんのいいところは感受性です。{userName}さんが感じたことに皆が共感し、わかりあうことができます。',
    '{userName}さんいいところは節度です。強引すぎない{userName}さん考えに皆が感謝しています。',
    '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}さんの心構えが多くの人に魅力的に映ります。',
    '{userName}さんのいいところは気配りです。{userName}さんの配慮が多くの人を救っています。',
    '{userName}さんのいいところはその全てです。ありのままの{userName}さん自身がいいところなのです。',
    '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}さんが皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
 function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
  }
