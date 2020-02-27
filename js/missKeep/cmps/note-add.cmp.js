export default {
    template: `
    <section class="note-add flex space-between">
        <input 
        type="text"
        autocomplete=off
        :placeholder="[[placeholder]]"
        />

        <div class="icons flex">
            <label>
                <input type="radio" v-model="type" value="text"  />  
                <span class="fas fa-font fa-lg selected"></span>
            </label>
            
            <label>
                <input type="radio" v-model="type" value="img" />  
                <span class="far fa-image fa-lg"></span>
            </label>

            <label>
                <input type="radio" v-model="type" value="video" />  
                <span class="fab fa-youtube fa-lg"></span>
            </label>

            <label>
                <input type="radio" v-model="type" value="todos" /> 
                <span class="fas fa-list fa-lg"></span>
            </label>
        </div>
    </section>
    `,
    data(){
        return {
            type: '',
            placeholder: 'What\'s on your mind...'
        }
    },
    watch: {
        'type'()
        {   
            if (this.type === 'text') {
                this.placeholder = 'What\'s on your mind...'
            } else if (this.type === 'img') {
                this.placeholder = 'Enter image URL...'
            } else if (this.type === 'video') {
                this.placeholder = 'Enter video URL...'
            } else {
                this.placeholder = 'Enter comma separated list...'
            }
        }
    }
}