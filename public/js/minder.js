$(() => {
   startUp();
   if (document.cookie === "") {
      document.cookie = "olduser";
      $('#introduction').fadeIn();
   }
   else {
      $('#introduction').remove();
   }
   $('.close').click(function () {
      $(this).parent('.closeable').fadeOut(function () {
         $(this).remove();
      })
   });
   $('.close-btn').click(function () {
      $(this).parents('.closeable').fadeOut(function () {
         $(this).remove();
      })
   })
});

function startUp() {
   const socket = io({forceNew: true});

   socket.emit('requestURL');
   socket.on('responseURL', id =>
       createQr(document.location+"s/"+id)
   );
   socket.on('sendingData', bool =>
       alert(`data received: ${bool}`)
   );
   $('#content').fadeIn();
}
function createQr(url) {
   console.log(url);
   const qr = qrcode(0, 'H');
   qr.addData(url);
   qr.make();
   $('#qr').html(qr.createSvgTag(100, 0))
}