$(document).ready(function(){
  $(".nav-btn").click(function(){
    $('.views-options').hide(300);

    var attr = $(this).attr('data-li');

    $('.nav-btn').removeClass('active');
    $(this).addClass('active');

    $('.item').hide();

    paginate(attr);
  });

  $(document).on('click',  '.pagination-button', function(){
    $('.views-options').hide(300);

    const pagenumber = $(this).attr('page-no');
    var activetype = $('.nav-btn.active').attr('data-li');
    var currentPage = $('.pagination-button.active').attr('page-no');

    if ($(this).hasClass('active')){
      return;
    } else {
      $('.pagination-button').removeClass('active');
      $(this).addClass('active');
      paginate(activetype, pagenumber, currentPage);
    };
  });

  $('.gear-icon').click(function(){
    $('.views-options').toggle(300);
  });

  $('.views-options').click(function(){
    $('.views-options').hide(300);

    // supprimer les éléments child vides
    $('.empty-child').remove();

    const attr = $(this).attr('sort');

    if (attr === 'best-fame'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-id'));
        var contentB =parseInt( $(b).attr('sort-id'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'price'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-price'));
        var contentB =parseInt( $(b).attr('sort-price'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'price-dec'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-price'));
        var contentB =parseInt( $(b).attr('sort-price'));
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
      }).appendTo('.items');
    }

    // ajouter à nouveau les éléments child vides
    $('.items').append(`
      <article class="empty-child"></article>
      <article class="empty-child"></article>
      <article class="empty-child"></article>
    `);
  })
});

function paginate(type, action, currentPage){

  if (type === 'all'){
    type = undefined;
  };

  const items = $(`.item${type?'.'+type:''}`);
  const itemlength = items.length;
  const itemsperpage = 16;
  const totalpages = Math.ceil(itemlength / itemsperpage);

    // créer des blocs de pages
    const pagechunks = [[]];
    let pagechunkindex = 0;

    items.each(function(){
      if (pagechunks[pagechunkindex].length >= itemsperpage){
        pagechunks.push([]);
        pagechunkindex++;
      };
      pagechunks[pagechunkindex].push(this);
    })

    //  Obtenir le bloc de page actuel
    var currentPagechunk = currentPage - 1;
    var expectedPagechunk;

    // Cacher tous les éléments
    $('.item').hide();

    if (!action){
      expectedPagechunk = 0;
      $.each(pagechunks[expectedPagechunk], function(_, item){
        $(item).show();
      });
    } else if (!action || action === 'next'){
      expectedPagechunk = pagechunks[currentPagechunk+1] ? currentPagechunk+1 : 0
      $.each(pagechunks[expectedPagechunk] || pagechunks[0], function(_, item){
        $(item).show();
      });
    } else if (action === 'prev'){
      expectedPagechunk = pagechunks[currentPagechunk-1] ? currentPagechunk-1 : pagechunks.length - 1;
      $.each(pagechunks[expectedPagechunk] || pagechunks[expectedPagechunk], function(_, item){
        $(item).show();
      });
    } else if (!isNaN(action)){
      expectedPagechunk = Number(action) - 1;
      $.each(pagechunks[expectedPagechunk], function(_, item){
        $(item).show();
      });
    };


    // S'inscrire au paginateur
    const contentpagenums = [];

    $.each(pagechunks, function(index){
      if (expectedPagechunk === index){
        contentpagenums.push(`<li class="pagination-button active" page-no="${index+1}">${index+1}</li>`);
      } else {
        contentpagenums.push(`<li class="pagination-button" page-no="${index+1}">${index + 1}</li>`)
      }
    });

    const newContent =
    `<ul class="pageinfo">
         <li class="pagination-button" page-no="prev"> << </li>
         ${contentpagenums.join('').replace(/\.{1,}/g,'<li class="dots">...</li>')}
         <li class="pagination-button" page-no="next"> >> </li>
     </ul>
    `;

    const paginator = $('.paginator');
    paginator.empty();
    paginator.append(newContent);

    $('body,html').animate({scrollTop:$('.main').offset().top},500)

    // Renvoi du numéro de page actuel et du numéro de page total
    return {
      currentPage: currentPagechunk + 1,
      totalPage: pagechunks.length
    };
  };
