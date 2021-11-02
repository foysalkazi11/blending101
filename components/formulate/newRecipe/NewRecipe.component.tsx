
import React from 'react'
import styles from  './NewRecipe.module.css'

const NewRecipe = (props) => {
    return (
        <div>
		
            <div className={styles.addrecipe_fixed_container}>
						<div className="compare-btm-slider-item edit__recipe__box">
							<div className="recipe-main-box">
								<button className="delete-compare-btn-hvr"> <span className="material-icons-outlined">
										close
									</span> </button>
								<div className="recipe-media-object">
									<div className="media">
										<div className="recipe-midia-img">
											<div className="file-upload">
												<div className="image-upload-wrap">
													<input className="file-upload-input" type='file'
                                                       /* @ts-ignore */ 
														onChange="readURL(this);" 
                                                        accept="image/*" />
													<div className="drag-text">
														<button className="AddImg-Btn"><img
																src="assets/images/black-add.svg" alt="" /></button>
													</div>
												</div>
												<div className="file-upload-content">
													<div className="uploadimg-wrp"> <img className="file-upload-image" src="#"
															alt="your image" /> </div>
													<div className="image-title-wrap">
                                                    {/* @ts-ignore */ }
														<button type="button" onClick="removeUpload()"
															className="remove-image"><span className="material-icons">
																close
															</span></button>
													</div>
												</div>
											</div>
										</div>
										<div className="media-body">
											<div className="recipe-top-wrp">
												<div className="recipe-add-title">
													<div className="add-recipe-form  notes">
														<form>
															<div className="form-group">
																<input type="text" className="form-control"
																	placeholder="Add Recipe Title" />
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="recipe-listing-vertical">
										<ul>
											<li> <span>Net Carbs </span> <strong>0</strong> </li>
											<li> <span>Rx Score </span><strong>0</strong> </li>
											<li> <span>Calories</span><strong> 0</strong> </li>
										</ul>
									</div>
									<div
										className="recipe-btm-row d-flex justify-content-between align-items-center invisible">
										<div className="recipe-logo">
											<figure><img src="assets/images/delish.png" alt="" /></figure>
										</div>
										<div className="recipe-right-options">
											<ul className="recipe-options-btm">
												<li>
													<a className="bookmark-btn" href="javascript:void(0)"
														data-target="#favorite-modal" data-toggle="modal"> <img
															className="selected" src="assets/images/BookmarksStar-1.svg"
															alt="" /> <img className="not-selected"
															src="assets/images/BookmarksStar.svg" alt="" /> </a>
												</li>
												<li>
													<button className="comment-btn comments d-flex align-items-center"> <img
															className="selected" src="assets/images/comment.svg" alt="" />
														<img className="not-selected" src="assets/images/no-comment.svg"
															alt="" /> <span className="count-comment">
															21
														</span> </button>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="brdr-wrp-compareitems">
								<div className="item-type-top d-flex align-items-center"> <span className="green-icon-bx">
										<img src="assets/images/right-blender.svg" alt="" />
									</span>
									<h5>Ingredients</h5>
								</div>
								<div className="add-recipe-form  ingredients">
									<form>
										<div className="form-group">
											<input type="text" className="form-control"
												placeholder="Enter, paste, add or drag ingredients" />
										</div>
									</form>
									<ul className="make-recipe-listing"> </ul>
								</div>
							</div>
							<div className="brdr-wrp-compareitems p-0 nutrition-main-box">
								<div className="item-type-top d-flex align-items-center"> <span className="green-icon-bx">
										<img src="assets/images/chart-bar-light-green.svg" alt="" />
									</span>
									<h5>Nutrition</h5>
								</div>
								<div className="amout-per-saving"> <span>Amount Per Serving Calories</span>
									<table>
										<tr>
											<th>Calories</th>
											<th className="no-value">00</th>
											<th></th>
										</tr>
										<tr>
											<td></td>
											<td className="value-text"> Value </td>
											<td className="grey-fill daily-cal"> Daily% </td>
										</tr>
									</table>
								</div>
								<div className="accordion-main-wrp">
									<div className="accordion-panel-default">
										<button type="button" className="according-toggle"> <span className="orange-light-bg">
												<span className="material-icons">
												</span> </span> Energy </button>
										<div className="panel-collapse-nutrition">
											<table>
												<tr>
													<td> </td>
													<td> </td>
													<td> </td>
												</tr>
											</table>
										</div>
									</div>
									<div className="accordion-panel-default">
										<button type="button" className="according-toggle"> <span className="orange-light-bg">
												<span className="material-icons">

												</span> </span> Vitamins </button>
										<div className="panel-collapse-nutrition">
											<table>
												<tr>
													<td> </td>
													<td> </td>
													<td> </td>
												</tr>
											</table>
										</div>
									</div>
									<div className="accordion-panel-default">
										<button type="button" className="according-toggle"> <span className="orange-light-bg">
												<span className="material-icons">
												</span> </span> Minerals </button>
										<div className="panel-collapse-nutrition">
											<table>
												<tr>
													<td> </td>
													<td> </td>
													<td> </td>
												</tr>
											</table>
										</div>
									</div>
									<div className="accordion-panel-default">
										<button type="button" className="according-toggle"> <span className="orange-light-bg">
												<span className="material-icons">

												</span> </span> Phythonutrients </button>
									</div>
								</div>
							</div>
							<div className="save-data"> <a href="#" className="orange-btn hvr-green">Save</a> </div>
						</div>
					</div>
        </div>
    )
}

export default NewRecipe
