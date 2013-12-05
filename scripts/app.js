(function ($) {

    //demo data
    var contacts = [
        { name: "Luiz Perez", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "lperez@avenuecode.com", type: "fellow" },
        { name: "Alexandre Santos", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "asantos@avenuecode.com", type: "fellow" },
        { name: "Caio Pimenta", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "cpimenta@avenuecode.com", type: "fellow" },
        { name: "Joao Lima", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "jlima@avenuecode.com", type: "fellow" },
        { name: "Louise Avelar", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "lavelar@avenuecode.com", type: "colleague" },
        { name: "Sabrina Fantoni", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "sfantoni@avenuecode.com", type: "colleague" },
        { name: "Dani Oliveira", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "doliveira@avenuecode.com", type: "colleague" },
        { name: "Roberta Doval", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "rdoval@avenuecode.com", type: "colleague" }
    ];

    //define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "../img/placeholder.png"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    //define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: $("#contactTemplate").html(),
        //template: 'staffTemplate',

        render: function () {
            var tmpl = _.template(this.template);

            
            
            $(this.el).html(tmpl(this.model.toJSON()));



            return this;
        }
    });

    var HeaderView = Backbone.View.extend({
        el: $("#header"),
        tagName: "nav",
        className: "top-bar",
        template: $("#headerTemplate").html(),

        render: function() {
            var template = _.template(this.template);

            $(this.el).html(template());
        }

    });

    var MainAreaView = Backbone.View.extend({
        el: $("#mainArea"),
        tagName: "article",
        template: $("#mainTemplate").html(),

        render: function() {
            var template = _.template(this.template);

            $(this.el).html(template());
        }
    });

    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {
            this.collection = new Directory(contacts);
            this.render();
        },

        /*render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },*/

        renderMainArea: function() {
            var mainAreaView = new MainAreaView().render();
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        }
    });

    DirectoryView.prototype.render = function render() {
        new HeaderView().render();
        //new MainAreaView().render();
        this.collection.models.forEach(this.renderContact.bind(this));
    };

    //create instance of master view
    var directory = new DirectoryView();

} (jQuery));