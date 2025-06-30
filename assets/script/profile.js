'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const api_url = 'https://dummyjson.com';
  const logOutEl = document.querySelector('.logOut');
  const wrapperEl = document.querySelector('.wrapper');

  const checkToken = function () {
    let token = localStorage.getItem('accessToken');

    if (token) {
      fetch(`${api_url}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Token is wrong');
          return res.json();
        })
        .then(data => {
          cardRender(data);
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          return window.location.replace('../pages/login.html');
        });
    } else {
      return window.location.replace('../pages/login.html');
    }
  };

  window.onload = () => {
    checkToken();
  };

  function cardRender(data) {
    wrapperEl.innerHTML = null;
    const article = document.createElement('article');
    article.className = 'w-full lg:w-4/12 px-4 mx-auto';
    article.innerHTML = `
				<div
					class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
				>
					<div class="px-6">
						<div class="flex flex-wrap justify-center">
							<div class="w-full px-4 flex justify-center">
								<div class="relative">
									<img
										loading="lazy"
										alt="..."
										src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
										class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px hover:scale-105 duration-300"
									/>
								</div>
							</div>
							<div class="w-full px-4 text-center mt-20">
								<div class="flex justify-center py-4 lg:pt-4 pt-8">
									<div class="mr-4 p-3 text-center">
										<span
											class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
										>
											23
										</span>
										<span class="text-sm text-blueGray-400">Friends</span>
									</div>
									<div class="mr-4 p-3 text-center">
										<span
											class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
										>
											10
										</span>
										<span class="text-sm text-blueGray-400">Photos</span>
									</div>
									<div class="lg:mr-4 p-3 text-center">
										<span
											class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
										>
											89
										</span>
										<span class="text-sm text-blueGray-400">Comments</span>
									</div>
								</div>
							</div>
						</div>
						<div class="text-center mt-12">
							<h3
								class="text-xl font-semibold leading-normal text-blueGray-700 mb-2"
							>
								${data.firstName} ${data.lastName}
							</h3>
							<div
								class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
							>
								<i
									class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
								></i>
								${data.address.state}, ${data.address.city}
							</div>
							<div class="mb-2 text-blueGray-600 mt-10">
								<i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
								${data.company.department} - ${data.company.title}
							</div>
							<div class="mb-2 text-blueGray-600">
								<i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
								${data.university}
							</div>
						</div>
						<div class="mt-10 py-10 border-t border-blueGray-200 text-center">
							<div class="flex flex-wrap justify-center">
								<div class="w-full lg:w-9/12 px-4">
									<p class="mb-4 text-lg leading-relaxed text-blueGray-700">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
			iste, velit nostrum perferendis sunt, nulla modi esse explicabo fugiat
			illo sint accusamus impedit in! Nam reprehenderit possimus est aut quae.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
        `;
    wrapperEl.appendChild(article);
  }

  logOutEl.onclick = () => {
    localStorage.removeItem('accessToken');
    open('../pages/login.html', '_self');
  };
});
