<template>
	<div>
		<div class="wrapper">
			<input class="hidden-trigger" id="toggle" type="checkbox" />
			<label class="circle" for="toggle">
				<span>
					<font-awesome-icon icon="ellipsis-h" />
				</span>
			</label>

			<div class="subs">
				<button class="sub-circle">
					<router-link v-b-modal.modal :to="{ path:'/edit/'+veilleUrl+'modal/add-window'}">
						<span>
							<font-awesome-icon icon="plus" />
						</span>
					</router-link>
				</button>
				<button class="sub-circle">
					<router-link
						v-b-modal.modal
						:to="{ path:'/edit/'+veilleUrl+'modal/edit-color', params: { color: bg}}"
					>
						<span>
							<font-awesome-icon icon="paint-roller" />
						</span>
					</router-link>
				</button>
				<button class="sub-circle">
					<router-link :to="'/edit/'+switchUrl">
						<span>
							<font-awesome-icon icon="sync-alt" />
						</span>
					</router-link>
				</button>
				<button class="sub-circle">
					<router-link v-b-modal.modal :to="{ path:'/edit/'+veilleUrl+'modal/edit-tempsV'}">
						<span class="font-weight-bold">zZ</span>
					</router-link>
				</button>
				<button class="sub-circle">
					<router-link v-b-modal.modal :to="{ path:'/edit/'+veilleUrl+'modal/user'}">
						<span>
							<font-awesome-icon icon="user" />
						</span>
					</router-link>
				</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		bg: String,
		editMode: Boolean
	},
	data() {
		return {
			modal: {
				url: "http://www.lastrolabe.org/",
				width: "",
				height: "",
				posX: "",
				posY: ""
			},
			background: null,
			veilleUrl: "",
			switchUrl: ""
		};
	},
	// Lors de la création du Composant on gère les url des liens en fonction du mode
	created: function() {
		if (this.$route.fullPath.includes("veille")) {
			// Si on est en mode veille
			(this.veilleUrl = "veille/"), (this.switchUrl = "home/");
		} else {
			// Si on est en mode home
			(this.veilleUrl = "home/"), (this.switchUrl = "veille/");
		}
	},
	// Lors de la création du DOM
	mounted() {
		// On écoute l'évenement
		this.$on("backgroundUpdate", function(value) {
			this.background = value;
		});
	}
};
</script>
<style lang="scss" scoped>
	$circle: #3f51b5;
	$sub-circle: rgb(42, 77, 143);

	//reset
	button {
		border: none;
		outline: none;
		background-color: #2a4d8f;
	}
	.wrapper {
		position: absolute;
		bottom: 25px;
		right: 25px;
		width: 60px;
		height: 60px;
	}

	.circle {
		display: table;
		position: relative;
		padding: 0;
		z-index: 98;
		margin: 0 auto;
		-webkit-box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		height: 60px;
		width: 60px;
		background-color: $circle;
		transition: 0.2s;
		text-align: center;
		color: white;
		& span {
			display: table-cell;
			vertical-align: middle;
		}
		&:active {
			transform: scale(0.9);
			box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
		}
		&:hover {
			cursor: pointer;
			background-color: lighten($circle, 10%);
			box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.3);
		}
	}
	.sub-circle {
		z-index: 0;
		position: absolute;
		height: 40px;
		width: 40px;
		overflow: hidden;
		border-radius: 50%;
		transition: 0.3s;
		transform: scale(0.5);
		opacity: 0;
		padding: 0;
		margin: 0;
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
		label,
		a {
			display: table;
			background-color: $sub-circle;
			color: white;
			width: 100%;
			height: 100%;
			transition: 200ms;
			text-decoration: none;
			& span {
				display: table-cell;
				vertical-align: middle;
			}
			&:hover {
				cursor: pointer;
				background-color: lighten($circle, 10%);
			}
		}
	}
	.subs {
		left: -20px;
		top: -50px;
		width: 40px;
		height: 40px;
		text-align: center;
		z-index: 0;
		margin: 0 auto;
		position: relative;
	}

	$transition: 0.1;
	$translateValue: 50;

	.hidden-sub-trigger {
		display: none;
		&:checked ~ label {
			background-color: lighten($circle, 10%);
		}
	}
	.hidden-trigger {
		display: none;
		&:checked ~ .circle {
			transform: scale(0.9);
			cursor: pointer;
			background-color: lighten($circle, 10%);
			box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
		}
		&:checked ~ .subs button:nth-of-type(1) {
			transform: translate(-$translateValue + px, 0px) scale(1);
			opacity: 1;
			transition: $transition + s;
		}
		&:checked ~ .subs button:nth-of-type(2) {
			transform: translate(-$translateValue * 2 + px, 0px) scale(1);
			opacity: 1;
			transition: $transition * 2 + s;
		}
		&:checked ~ .subs button:nth-of-type(3) {
			transform: translate(-$translateValue * 3 + px, 0px) scale(1);
			opacity: 1;
			transition: $transition * 3 + s;
		}
		&:checked ~ .subs button:nth-of-type(4) {
			transform: translate(-$translateValue * 4 + px, 0px) scale(1);
			opacity: 1;
			transition: $transition * 4 + s;
		}
		&:checked ~ .subs button:nth-of-type(5) {
			transform: translate(-$translateValue * 5 + px, 0px) scale(1);
			opacity: 1;
			transition: $transition * 5 + s;
		}
	}
</style>
