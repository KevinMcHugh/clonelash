(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){},39:function(e,t,a){e.exports=a(85)},44:function(e,t,a){},83:function(e,t,a){},85:function(e,t,a){"use strict";a.r(t);var n=a(15),r=a(34),s=a.n(r),o=(a(44),a(35)),i=a.n(o),c=a(36),l=a.n(c)()(i.a)(),u=a(17),p=a.n(u),m=a(37),h=a(38),d=a.n(h);function f(e,t){var a=[],n=d()(e,a).exec(t);if(!n)return null;for(var r=Object.create(null),s=1;s<n.length;s++)r[a[s-1].name]=void 0!==n[s]?n[s]:void 0;return r}function v(){return(v=Object(m.a)(p.a.mark(function e(t,a){var r,s,o,i,c,l,u,m,h,d;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=!0,s=!1,o=void 0,e.prev=3,i=t[Symbol.iterator]();case 5:if(r=(c=i.next()).done){e.next=19;break}if(l=c.value,u=a.error?"/error":a.pathname,m=f(l.path,u)){e.next=11;break}return e.abrupt("continue",16);case 11:return e.next=13,l.action(Object(n.a)({},a,{params:m}));case 13:if(!(h=e.sent)){e.next=16;break}return e.abrupt("return",h);case 16:r=!0,e.next=5;break;case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(3),s=!0,o=e.t0;case 25:e.prev=25,e.prev=26,r||null==i.return||i.return();case 28:if(e.prev=28,!s){e.next=31;break}throw o;case 31:return e.finish(28);case 32:return e.finish(25);case 33:throw(d=new Error("Not found")).status=404,d;case 36:case"end":return e.stop()}},e,this,[[3,21,25,33],[26,,28,32]])}))).apply(this,arguments)}var y={resolve:function(e,t){return v.apply(this,arguments)}},g=a(0),b=a.n(g),E=a(2),O=a(3),_=a(5),j=a(4),k=a(6),C=a(1),S=a.n(C),w=(a(31),function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e))).state={games:[]},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"componentWillMount",value:function(){var e=this;S.a.get("api/games.json").then(function(t){e.setState({games:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return b.a.createElement("div",{className:"App"},b.a.createElement("header",{className:"App-header"},"Stink Buttsmell",this.state.games.map(function(e){return b.a.createElement("a",{key:e.id,href:"/games/"+e.id}," ",e.id," ")})))}}]),t}(g.Component)),A=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e)))._addAPlayer=function(e){e.preventDefault(),S.a.post("http://localhost:3001/admin/add_player",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a._answerQuestions=function(e){e.preventDefault(),S.a.post("http://localhost:3001/admin/answer_questions",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a._completeVotes=function(e){e.preventDefault(),S.a.post("http://localhost:3001/admin/complete_votes",{game_id:a.props.game_id}).catch(function(e){return console.log(e)})},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return b.a.createElement("div",null,b.a.createElement("button",{onClick:this._addAPlayer},"Add a player."),b.a.createElement("button",{onClick:this._answerQuestions},"Answer all questions."),b.a.createElement("button",{onClick:this._completeVotes},"Complete all votes."))}}]),t}(g.Component),P=a(8),x=(a(83),function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e))).handleReceivedPlayer=function(e){if("Player"==e.message_type){var t=a.state.players;t.some(function(t){return t.id===e.id})||t.push(e),console.log(e),a.setState({players:t})}},a.state={players:[]},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;S.a.get("http://localhost:3001/games/"+this.props.game_id+"/players").then(function(t){e.setState({players:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"GameChannel",id:this.props.game_id},t=(this.props.player||{}).id;return this.state.players?b.a.createElement("div",{className:"Player-container"},b.a.createElement(P.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayer}),this.state.players.map(function(e){return b.a.createElement("div",{key:e.id,className:e.id===t?"Player Player-current":"Player"},e.name)})):b.a.createElement("div",null,"hang on...")}}]),t}(g.Component)),R=a(9),V=a.n(R),M=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e))).handleReceivedPlayerMessage=function(e){if("Response"===e.message_type){var t=a.state.prompts;t.some(function(t){return t.id===e.id})||t.push(e),a.setState({prompts:t})}},a._onSubmit=function(e,t){e.preventDefault();var n=e.target.elements[0].value;S.a.put("http://localhost:3001/responses/"+t,{text:n}).then(function(e){var t=a.state.prompts;V.a.remove(t,{id:e.data.id}),a.setState({prompts:t})}).catch(function(e){return console.log(e)})},a.state={prompts:null},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;S.a.get("http://localhost:3001/players/"+this.props.playerId+"/prompts").then(function(t){e.setState({prompts:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"PlayerChannel",id:this.props.playerId};return null===this.state.prompts?b.a.createElement("div",null,"hang on..."):V.a.isEmpty(this.state.prompts)?b.a.createElement("div",null,"Wait for other players..."):V.a.isEmpty(this.state.prompts)?void 0:b.a.createElement("div",null,b.a.createElement(P.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayerMessage}),this._renderMessage())}},{key:"_renderMessage",value:function(){var e=this,t=V.a.first(this.state.prompts);if(t)return b.a.createElement("div",null,"Answer this question: ",t.game_prompt.text,b.a.createElement("form",{onSubmit:function(a){return e._onSubmit(a,t.id)}},b.a.createElement("input",{name:"text"}),b.a.createElement("button",null,"OK")))}}]),t}(g.Component),N=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e))).handleReceivedPlayerMessage=function(e){if("Vote"===e.message_type){var t=a.state.responsesToVoteOn;t.some(function(t){return t.id===e.id})||t.push(e),a.setState({responsesToVoteOn:t})}},a._onClick=function(e,t,n){S.a.put("http://localhost:3001/votes/"+t,{response_id:n}).then(function(e){var t=a.state.responsesToVoteOn;V.a.remove(t,{id:e.data.id}),a.setState({responsesToVoteOn:t})}).catch(function(e){return console.log(e)})},a.state={responsesToVoteOn:null},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;S.a.get("http://localhost:3001/votes",{params:{player_id:this.props.playerId,foo:"bar"}}).then(function(t){e.setState({responsesToVoteOn:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"PlayerChannel",id:this.props.playerId};return null===this.state.prompts?b.a.createElement("div",null,"hang on..."):V.a.isEmpty(this.state.responsesToVoteOn)?b.a.createElement("div",null,"Wait for other players..."):b.a.createElement("div",null,b.a.createElement(P.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedPlayerMessage}),this._renderVote())}},{key:"_renderVote",value:function(){var e=V.a.first(this.state.responsesToVoteOn);if(e)return b.a.createElement("div",null,"vote now: ",e.game_prompt.text,b.a.createElement("div",null,this._renderResponses(e)))}},{key:"_renderResponses",value:function(e){var t=this;return e.responses.map(function(a){return b.a.createElement("button",{key:a.id,onClick:function(n){return t._onClick(n,e.id,a.id)}},a.text)})}}]),t}(g.Component),D=function(e){function t(){return Object(E.a)(this,t),Object(_.a)(this,Object(j.a)(t).apply(this,arguments))}return Object(k.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props.playerId;return"started"===this.props.game.state?b.a.createElement(M,{playerId:e}):"voting_opened"===this.props.game.state?b.a.createElement(N,{playerId:e}):"Game will start soon...Maybe a join code goes here."}}]),t}(g.Component),I=a(18),G=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(_.a)(this,Object(j.a)(t).call(this,e))).handleReceivedGame=function(e){"Game"===e.message_type&&a.setState({game:e})},a._onSubmit=function(e){e.preventDefault();var t=e.target.elements[0].value;S.a.post("/players",{game_id:a.props.params.id,name:t}).then(function(e){(new I.a).set("player_id",e.data.id,{path:"/"}),a.setState({player:e.data})}).catch(function(e){return console.log(e)})},a._startGame=function(e){e.preventDefault(),S.a.put("/games/"+a.props.params.id,{game:{state:"started"}}).then(function(e){a.setState({game:e.data})}).catch(function(e){return console.log(e)})},a.state={game:null,player:null,messages:[]},a}return Object(k.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;S.a.get("/games/"+this.props.params.id).then(function(t){e.setState({game:t.data})}).catch(function(e){return console.log(e)});var t=new I.a;t.get("player_id")&&S.a.get("/players/"+t.get("player_id")).then(function(t){e.setState({player:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e={channel:"GameChannel",id:this.props.params.id};return this.state.game?b.a.createElement(P.ActionCableProvider,{url:"ws://localhost:3001/cable"},b.a.createElement("div",{className:"App"},b.a.createElement(P.ActionCableConsumer,{channel:e,onReceived:this.handleReceivedGame}),b.a.createElement("header",{className:"App-header"},"game state: ",this.state.game.state),b.a.createElement("div",{className:"App-body"},this._renderStartOrWait(),b.a.createElement("div",{className:"App-player"},this._renderPlayer()),b.a.createElement(x,{game_id:this.props.params.id,player:this.state.player})),b.a.createElement("footer",{className:"App-footer"},b.a.createElement(A,{game_id:this.props.params.id})))):b.a.createElement("div",{className:"App"},b.a.createElement("header",{className:"App-header"},"hang on..."))}},{key:"_renderStartOrWait",value:function(){var e=this;if("created"===this.state.game.state)return this.state.game.startable?b.a.createElement("button",{onClick:function(t){return e._startGame(t)}},"Start the game now!"):b.a.createElement("div",null," Waiting for more players! ")}},{key:"_renderPlayer",value:function(){return this.state.player?b.a.createElement(D,{playerId:this.state.player.id,game:this.state.game}):"created"!=this.state.game.state?b.a.createElement("div",null," Sorry, you are too late to join the game, but have fun voting!"):b.a.createElement("form",{onSubmit:this._onSubmit},b.a.createElement("input",{name:"name",placeholder:"player name"}),b.a.createElement("button",null,"OK"))}}]),t}(g.Component),T=[{path:"/",action:function(){return b.a.createElement(w,null)}},{path:"/games/:id",id:"foo",action:function(e){return b.a.createElement(G,e)}}],W=document.getElementById("root");function q(e){s.a.render(e,W)}function B(e){y.resolve(T,e).then(q).catch(function(t){return y.resolve(T,Object(n.a)({},e,{error:t})).then(q)})}B(l.getCurrentLocation()),l.listen(B)}},[[39,1,2]]]);
//# sourceMappingURL=main.844cb2cc.chunk.js.map