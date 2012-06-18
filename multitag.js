var MultiTag = function( elId, options){
    
    this.id       = elId;
    this.jqEl     = $('#'+elId);
    this.options  = options || {};

    this.toggle   = function( value, event ){};

    this.clearSelected = function(){
        this.jqEl.find('input.hidden-check:checked').each ( function(){
            this.checked = false;
            $(this).parent().removeClass('multi-tag-item-selected');
        });
    }

    this.selectItem = function(self, event){
        var el = $(event.target);

        el.toggleClass('multi-tag-item-selected');
        
        var check = el.find('input.hidden-check').get(0);
        check.checked = !check.checked;

        self.toggle( check.value, event );
    }

    this.getSelected = function(){
        var values = [];
        this.jqEl.find( 'input.hidden-check:checked' ).each( function(){
            values.push( this.value );
        });

        return values;
    }

    this.init = function(){

        for ( var i in this.options ){
            console.log( i );
            this[i] = this.options[i];
        }

        var lists = this.jqEl.find('ul'); 
        var count = lists.length;
        var self  = this;

        this.jqEl.addClass('multi-tag');

        lists.find('li').each( function(){
            var item  = $(this);
            var value = item.text();

            if ( item.data('value') ){
                value = item.data('value');
            }

            var check = $("<input class='hidden-check' type='checkbox' value='"+value+"' />");
            check.css('position', 'absolute').css('visibility', 'hidden');

            item.prepend(check);

        }).click( function( event ){
            self.selectItem ( self, event );
        });

        lists.css( 'float', 'left' );
        this.jqEl.append( '<div style="clear: both"></div>' );
    }

    this.init();
}

