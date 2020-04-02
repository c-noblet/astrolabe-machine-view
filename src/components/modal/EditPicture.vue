<template>
	<b-form>
		<b-form-group label="Importer une image:" label-for="bg-pic" class="mt-3">
			<b-form-file
				id="bg-pic"
				v-model="background"
				:state="Boolean(background)"
				placeholder="Choose a file or drop it here..."
				drop-placeholder="Drop file here..."
			></b-form-file>
		</b-form-group>
		<b-button type="button" v-on:click="onSubmit()" variant="primary">
			<b-spinner ref="spinner" small type="grow"></b-spinner>Sauvegarder
		</b-button>
	</b-form>
</template>
<script>
import options from "../../../options.env";
export default {
	props: {
		apiToken: String
	},
	data() {
		return {
			background: null
		};
	},
	methods: {
		// Lors du form submit
		onSubmit: function() {
			// on affiche le loader dans le bouton
			this.$refs["spinner"].style.display = "inline-block";

			// On créé le body de la requête
			const formData = new FormData();
			formData.append("image", this.background);
			formData.append("veille", this.$route.fullPath.includes("veille").toString());

			// On fait la requête
			fetch(options.API_BACKGROUND_URL, {
				method: "POST",
				headers: {
					"X-Auth-Token": this.apiToken
				},
				body: formData
			})
				.then(results => results.json())
				.then(data => {
					if (typeof data.error !== "undefined") {
						// En cas d'erreur on fait une alerte
						alert(data.error);
					} else {
						// Sinon on déclenche les évenements suite à la reception
						this.$emit("closeModal", true);
						this.$emit("backgroundUpdated", options.API_BACKGROUND_URL);
					}
					// On enlève le loader
					this.$refs["spinner"].style.display = "";
				})
				.catch(function(err) {
					alert(err);
				});
		}
	}
};
</script>