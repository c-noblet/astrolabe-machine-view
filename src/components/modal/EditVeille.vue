<template>
	<b-form>
		
			<b-form-group
				label="Durée par défaut avant la mise en veille"
				label-for="edit-temps-normal"
			>
				<b-form-input
          id="edit-temps-normal"
					class="w-50"
          v-model="modal.normal"
					placeholder="en minutes"
          required
        ></b-form-input>
			</b-form-group>

			<b-form-group
				label="Durée si média avant la mise en veille"
				label-for="edit-temps-media"
			>
				<b-form-input
          id="edit-temps-media"
					class="w-50"
          v-model="modal.media"
					placeholder="en minutes"
          required
        ></b-form-input>
			</b-form-group>

			<b-form-checkbox
					id="checkbox-1"
					class="mb-3"
					v-model="modal.isMedia"
					name="checkbox-1"
					:value="true"
					:unchecked-value="false"
				>
					Activer le mode média
				</b-form-checkbox>

		<b-button type="button" v-on:click="onSubmit()" variant="primary">
			<b-spinner ref="spinner" small type="grow"></b-spinner> Sauvegarder
		</b-button>
	</b-form>
</template>
<script>
import options from "../../../options.env";
export default {
	props: {
		apiToken: String,
		tempsVeille: Array
	},
	data() {
		return {
      modal: {
				normal: '',
				media: '',
				isMedia: false
			}
		};
	},
	mounted: function() {
		for (let i = 0; i < this.tempsVeille.length; i++) {
			if(this.tempsVeille[i].is_actif && this.tempsVeille[i].label === 'temps_media'){
				this.modal.isMedia = true;
			}
			if(this.tempsVeille[i].label === 'temps_media'){
				this.modal.media = this.tempsVeille[i].temps;
			}else{
				this.modal.normal = this.tempsVeille[i].temps;
			}
		}
	},
	methods: {
		onSubmit: function() {
			this.$refs["spinner"].style.display = "inline-block";
		
			const formData = new FormData();
			formData.append("temps_normal", this.modal.normal.toString());
			formData.append("temps_media", this.modal.media.toString());
			if(this.modal.isMedia){
				formData.append("is_actif", 'temps_media');
			}else{
				formData.append("is_actif", 'temps_normal');
			}
			
			fetch(options.API_TEMPS_VEILLE, {
				method: "POST",
				headers: {
					"X-Auth-Token": this.apiToken
				},
				body: formData
			})
				.then(results => results.json())
				.then(data => {
					if(typeof data.error !== 'undefined'){
						alert(data.error);
					}else{
						this.$emit("tempsVeilleUpdated", data);
						this.$emit("closeModal", true);
						this.$refs["spinner"].style.display = "";
					}
				}).catch(function(err){
					alert(err);
				});
		}
	}
};
</script>
