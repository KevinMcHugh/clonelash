(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){},39:function(e,t,a){e.exports=a(87)},44:function(e,t,a){},83:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){"use strict";a.r(t);var n=a(16),r=a(34),o=a.n(r),s=(a(44),a(35)),i=a.n(s),c=a(36),l=a.n(c)()(i.a)(),u=a(18),p=a.n(u),m=a(37),d=a(38),h=a.n(d);function f(e,t){var a=[],n=h()(e,a).exec(t);if(!n)return null;for(var r=Object.create(null),o=1;o<n.length;o++)r[a[o-1].name]=void 0!==n[o]?n[o]:void 0;return r}function g(){return(g=Object(m.a)(p.a.mark(function e(t,a){var r,o,s,i,c,l,u,m,d,h;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=!0,o=!1,s=void 0,e.prev=3,i=t[Symbol.iterator]();case 5:if(r=(c=i.next()).done){e.next=19;break}if(l=c.value,u=a.error?"/error":a.pathname,m=f(l.path,u)){e.next=11;break}return e.abrupt("continue",16);case 11:return e.next=13,l.action(Object(n.a)({},a,{params:m}));case 13:if(!(d=e.sent)){e.next=16;break}return e.abrupt("return",d);case 16:r=!0,e.next=5;break;case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(3),o=!0,s=e.t0;case 25:e.prev=25,e.prev=26,r||null==i.return||i.return();case 28:if(e.prev=28,!o){e.next=31;break}throw s;case 31:return e.finish(28);case 32:return e.finish(25);case 33:throw(h=new Error("Not found")).status=404,h;case 36:case"end":return e.stop()}},e,null,[[3,21,25,33],[26,,28,32]])}))).apply(this,arguments)}var v={resolve:function(e,t){return g.apply(this,arguments)}},y=a(0),b=a.n(y),_=a(2),E=a(3),k=a(5),C=a(4),w=a(6),O=a(1),j=a.n(O),P=(a(31),function(e){function t(){var e,a;Object(_.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(k.a)(this,(e=Object(C.a)(t)).call.apply(e,[this].concat(r))))._startGame=function(e){e.preventDefault(),j.a.put("games/"+a.props.game_id,{game:{state:"started"}}).then(function(e){a.setState({game:e.data})}).catch(function(e){return console.log(e)})},a._addAPlayer=function(e){e.preventDefault(),j.a.post("admin/add_player",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a._answerQuestions=function(e){e.preventDefault(),j.a.post("admin/answer_questions",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a._cancelGame=function(e){e.preventDefault(),j.a.put("games/"+a.props.game_id,{game:{state:"canceled"}}).then(function(e){a.setState({game:e.data})}).catch(function(e){return console.log(e)})},a._completeVotes=function(e){e.preventDefault(),j.a.post("admin/complete_votes",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){return this.props.player&&this.props.player.admin?b.a.createElement("div",null,b.a.createElement("button",{onClick:this._startGame},"Start the game now!"),b.a.createElement("button",{onClick:this._addAPlayer},"Add a player."),b.a.createElement("button",{onClick:this._answerQuestions},"Answer all questions."),b.a.createElement("button",{onClick:this._completeVotes},"Complete all votes."),b.a.createElement("button",{onClick:this._cancelGame},"Cancel the game now!")):null}}]),t}(y.Component)),S=a(8),x=(a(83),a(9)),N=a.n(x),A=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(k.a)(this,Object(C.a)(t).call(this,e))).handleReceivedPlayer=function(e){if("Player"===e.message_type){var t=a.state.players,n=N.a.findIndex(t,{id:e.id});if(n>=0){var r=t[n];r.score!==e.score&&(e.scoreUpdated=r.scoreUpdated?r.scoreUpdated+1:1),t[n]=e}else t.push(e);a.setState({players:t})}},a.state={players:[]},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this;j.a.get("games/"+this.props.game_id+"/players").then(function(t){e.setState({players:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"GameChannel",id:this.props.game_id},t=(this.props.player||{}).id,a=this.props.winners?this.props.winners.map(function(e){return e.id}):[];return this.state.players.length>0?b.a.createElement("div",{className:"Player-container"},b.a.createElement(S.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayer}),this.state.players.map(function(e){var n="Player";return e.id===t&&(n+=" Player-current"),a.includes(e.id)&&(n+=" Player-winner"),e.scoreUpdated&&(n+=" Player-score-updated-"+e.scoreUpdated%2),b.a.createElement("div",{key:e.id,className:n},e.name,b.a.createElement("div",null,"Score: ",e.score,b.a.createElement("div",{className:"Player-score",style:{width:"".concat(10*e.score,"px"),transitionProperty:"width",transitionDuration:"1.5s",transitionTimingFunction:"ease-out"}})))})):b.a.createElement("div",null,"hang on...")}}]),t}(y.Component),G=(a(85),function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(k.a)(this,Object(C.a)(t).call(this,e))).handleReceivedPlayerMessage=function(e){if("Response"===e.message_type){var t=a.state.prompts;t.some(function(t){return t.id===e.id})||t.push(e),a.setState({prompts:t})}},a._onSubmit=function(e,t){e.preventDefault();var n=e.target.elements[0].value;e.target.elements[0].value="",j.a.put("responses/"+t,{text:n}).then(function(e){var t=a.state.prompts;N.a.remove(t,{id:e.data.id}),a.setState({prompts:t})}).catch(function(e){return console.log(e)})},a.state={prompts:null},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this;j.a.get("players/"+this.props.playerId+"/prompts").then(function(t){e.setState({prompts:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"PlayerChannel",id:this.props.playerId};return null===this.state.prompts?b.a.createElement("div",null,"hang on..."):N.a.isEmpty(this.state.prompts)?b.a.createElement("div",null,"Wait for other players..."):N.a.isEmpty(this.state.prompts)?void 0:b.a.createElement("div",{className:"Prompt"},b.a.createElement(S.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayerMessage}),this._renderMessage())}},{key:"_renderMessage",value:function(){var e=N.a.first(this.state.prompts);if(e)return b.a.createElement("div",null,b.a.createElement("div",null," Answer this question: "),e.game_prompt.text,this._renderForm(e))}},{key:"_renderForm",value:function(e){var t=this;if(e.id)return b.a.createElement("form",{onSubmit:function(a){return t._onSubmit(a,e.id)}},b.a.createElement("input",{name:"text",autoComplete:"off",maxlength:30}),b.a.createElement("button",null,"OK"))}}]),t}(y.Component)),R=(a(86),function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(k.a)(this,Object(C.a)(t).call(this,e)))._getCurrentGamePrompt=function(){j.a.get("players/"+a.props.playerId+"/current_game_prompt").then(function(e){a.setState({gamePrompt:e.data})}).catch(function(e){return console.log(e)})},a.handleReceivedPlayerMessage=function(e){"GamePrompt"===e.message_type&&a.setState({gamePrompt:e})},a._onClick=function(e,t){j.a.post("votes",{response_id:t,player_id:a.props.playerId,game_prompt_id:a.state.gamePrompt.id}).then(function(e){a._getCurrentGamePrompt()}).catch(function(e){return console.log(e)})},a.state={gamePrompt:null},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){this._getCurrentGamePrompt()}},{key:"render",value:function(){var e={channel:"PlayerChannel",id:this.props.playerId};return null===this.state.gamePrompt?b.a.createElement("div",null,"hang on..."):N.a.isEmpty(this.state.gamePrompt)?b.a.createElement("div",null,"Wait for other players..."):b.a.createElement("div",{className:"Vote"},b.a.createElement(S.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayerMessage}),this._renderVote())}},{key:"_renderVote",value:function(){var e=this.state.gamePrompt;if(e)return b.a.createElement("div",null,b.a.createElement("div",null,"vote now:"),e.text,b.a.createElement("div",null,this._renderResponses(e)))}},{key:"_renderResponses",value:function(e){var t=this;return e.responses.map(function(e){return b.a.createElement("button",{className:"Vote-option",key:e.id,onClick:function(a){return t._onClick(a,e.id)},disabled:!e.selectable},e.text)})}}]),t}(y.Component)),I=function(e){function t(){return Object(_.a)(this,t),Object(k.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(w.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){var e=this.props.playerId,t=this.props.game.winners.map(function(e){return e.name});return"started"===this.props.game.state||"final_question_opened"===this.props.game.state?b.a.createElement(G,{playerId:e}):"voting_opened"===this.props.game.state||"final_voting_opened"===this.props.game.state?b.a.createElement(R,{playerId:e,game:this.props.game}):"finished"===this.props.game.state?(t.length>1?"Congrats to the winners, ":"Congrats to the winner, ")+t:"Game will start soon...Maybe a join code goes here."}}]),t}(y.Component),D=a(12),M=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(k.a)(this,Object(C.a)(t).call(this,e))).handleReceivedGame=function(e){"Game"===e.message_type&&a.setState({game:e})},a._onSubmit=function(e){e.preventDefault();var t=e.target.elements[0].value;j.a.post("players",{game_id:a.props.id,name:t}).then(function(e){a.props.setCookies(e.data.id,a.props.id),a.setState({player:e.data})}).catch(function(e){return console.log(e)})},a._onSubmitName=function(e){e.preventDefault();var t=e.target.elements[0].value;j.a.put("players/"+a.state.player.id,{name:t,playing:!0}).then(function(e){a.setState({player:e.data})}).catch(function(e){return console.log(e)})},a._onClickJustWatching=function(e){j.a.put("players/"+a.state.player.id,{playing:!1}).then(function(e){a.setState({player:e.data})}).catch(function(e){return console.log(e)})},a.state={game:null,player:null,messages:[]},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this;j.a.defaults.baseURL="/api",j.a.get("games/"+this.props.id).then(function(t){e.setState({game:t.data})}).catch(function(e){return console.log(e)});var t=new D.a;t.get("player_id")&&j.a.get("players/"+t.get("player_id")).then(function(t){e.setState({player:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"GameChannel",id:this.props.id},t="http:"===window.location.protocol?"ws://":"wss://",a=window.location.port?":3001":"";return this.state.game?b.a.createElement(S.ActionCableProvider,{url:"".concat(t).concat(window.location.hostname).concat(a,"/cable")},b.a.createElement("div",{className:"App"},b.a.createElement(S.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedGame}),b.a.createElement("header",{className:"App-header"},b.a.createElement(P,{game_id:this.props.id,player:this.state.player}),b.a.createElement("button",{onClick:this.props.unsetCookies,className:"small"},"Leave the game now")),b.a.createElement("div",{className:"App-body"},b.a.createElement("div",{className:"App-player"},this._renderPlayer()),b.a.createElement(A,{game_id:this.props.id,player:this.state.player,winners:this.state.game.winners})))):b.a.createElement("div",{className:"App"},b.a.createElement("header",{className:"App-header"},"hang on..."))}},{key:"_renderPlayer",value:function(){var e=this.state.player;return e?e.admin&&null==e.playing?b.a.createElement(b.a.Fragment,null,this._renderJustWatching(),"OR:",b.a.createElement("form",{onSubmit:this._onSubmitName,autoComplete:"off",maxlength:20},b.a.createElement("input",{name:"name",placeholder:"player name"}),b.a.createElement("button",null,"OK"))):b.a.createElement(I,{playerId:this.state.player.id,game:this.state.game}):b.a.createElement(b.a.Fragment,null,b.a.createElement("form",{onSubmit:this._onSubmit,autoComplete:"off",maxlength:20},b.a.createElement("input",{name:"name",placeholder:"player name"}),b.a.createElement("button",null,"OK")))}},{key:"_renderJustWatching",value:function(){return b.a.createElement("button",{onClick:this._onClickJustWatching},"Just Watching!")}}]),t}(y.Component),J=function(e){function t(e){var a;Object(_.a)(this,t),(a=Object(k.a)(this,Object(C.a)(t).call(this,e))).onClickGame=function(){j.a.get("games/current.json").then(function(e){a.setState({gameId:e.data.id})}).catch(function(e){return console.log(e)})},a._onClickNewGame=function(e){e.preventDefault(),j.a.post("games.json").then(function(e){a._setCookies(e.data.started_by_id,e.data.id),a.setState({gameId:e.data.id})})};var n=new D.a;return a.state={games:[],gameId:n.get("game_id")},a}return Object(w.a)(t,e),Object(E.a)(t,[{key:"componentWillMount",value:function(){document.title="Generic websocket-based game",j.a.defaults.baseURL="/api"}},{key:"render",value:function(){var e=this;return this.state.gameId?b.a.createElement(M,{id:this.state.gameId,setCookies:this._setCookies,unsetCookies:function(){return e._unsetCookies()}}):b.a.createElement("div",{className:"App"},b.a.createElement("header",{className:"App-header"}),b.a.createElement("div",{className:"game-links"},b.a.createElement("button",{onClick:this.onClickGame}," Join the existing game ")),b.a.createElement("div",{className:"new-game"},b.a.createElement("button",{onClick:this._onClickNewGame},"Start your own game")))}},{key:"_setCookies",value:function(e,t){var a=new D.a;a.set("player_id",e,{path:"/"}),a.set("game_id",t,{path:"/"})}},{key:"_unsetCookies",value:function(){var e=new D.a;e.remove("player_id"),e.remove("game_id"),this.setState({gameId:null})}}]),t}(y.Component),U=[{path:"/",action:function(){return b.a.createElement(J,null)}},{path:"/games/:id",id:"foo",action:function(e){return b.a.createElement(M,e)}}],W=document.getElementById("root");function V(e){o.a.render(e,W)}function F(e){v.resolve(U,e).then(V).catch(function(t){return v.resolve(U,Object(n.a)({},e,{error:t})).then(V)})}j.a.defaults.baseURL="/api",F(l.getCurrentLocation()),l.listen(F)}},[[39,1,2]]]);
//# sourceMappingURL=main.3661f402.chunk.js.map