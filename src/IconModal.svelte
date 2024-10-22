<div id="icon-popover" popover="manual">
	<div class="close-action-button">
		<button popovertarget="icon-popover" popovertargetaction="hide">Close</button>
	</div>
	<div class="row">
		<img src="rule_add.png" alt="sorry" />
		<p>Add given cards to the right of the clearing</p>
	</div>
	<div class="row">
		<img src="rule_remove.png" alt="sorry" />
		<p>Discard given cards from the given direction of the clearing</p>
	</div>
	<div class="row">
		<img src="rule_discard.png" alt="sorry" />
		<p>Discard one card directly from the draw pile</p>
	</div>
</div>

<style>
	img {
		width: 28px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	p {
		font-size: 12px;
	}
	#icon-popover {
		width: 240px;
		height: 180px;
		background-color: white;
		padding: 16px;
		border-radius: 8px;
		margin: 60px auto;
		position: relative;
		flex-direction: column;
		gap: 16px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
		&:popover-open {
			display: flex;
		}
	}
	.close-action-button {
		font-size: 14px;
		right: 8px;
		text-align: end;
		width: 100%;
	}
</style>
