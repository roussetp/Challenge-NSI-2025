console.log('%cHold Up', 'color: #404EED; font-size: 60px; font-weight: bold;-webkit-text-stroke: 1px black;');
console.log("%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.", "color: black; font-size: 18px;")
console.log("%cPasting anything in here could give attackers access to your Discord account.",
           "color: red; font-size: 18px; font-weight: bold;")
console.log('%cHold Up', 'color: #404EED; font-size: 60px; font-weight: bold;-webkit-text-stroke: 1px black;');
console.log("%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.", "color: black; font-size: 18px;")
console.log("%cPasting anything in here could give attackers access to your Discord account.",
           "color: red; font-size: 18px; font-weight: bold;")
console.log("%cUnless you understand exactly what you are doing, close this window and stay safe.", "color: black; font-size: 18px;")
console.log('%cHold Up', 'color: #404EED; font-size: 60px; font-weight: bold;-webkit-text-stroke: 1px black;');
console.log("%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.", "color: black; font-size: 18px;")
console.log("%cPasting anything in here could give attackers access to your Discord account.",
           "color: red; font-size: 18px; font-weight: bold;")
console.log("%cUnless you understand exactly what you are doing, close this window and stay safe.", "color: black; font-size: 18px;")

$(function(){
  $('.nav-bar-action').on('click', function(){
    if ($('.nav-bar-liens').hasClass('active')){
      $('.nav-bar-liens').removeClass('active');
    } else {
      $('.nav-bar-liens').addClass('active');
    }
  })
});
