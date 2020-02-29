export default {
    template: `
    <section class="note-colors">
        <div class="colors">
            <span class="color" style="background-color: #F49097" @click="$emit('colorChange','#F49097')"></span>
            <span class="color" style="background-color: #DFB2F4" @click="$emit('colorChange','#DFB2F4')"></span>
            <span class="color" style="background-color: #F5E960" @click="$emit('colorChange','#F5E960')"></span>
            <span class="color" style="background-color: #9EE4DA" @click="$emit('colorChange','#9EE4DA')"></span>
            <span class="color" style="background-color: #80ED99" @click="$emit('colorChange','#80ED99')"></span>
            <span class="color" style="background-color: #BEA7E5" @click="$emit('colorChange','#BEA7E5')"></span>
            <span class="color" style="background-color: #FFB17A" @click="$emit('colorChange','#FFB17A')"></span>
            <span class="color" style="background-color: #C49E85" @click="$emit('colorChange','#C49E85')"></span>
        </div>
    </section>
    `
}