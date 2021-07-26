function HomePage() {
  return (
    <main className="page-wrapper">
      <header
        className="header navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky"
        data-scroll-header
        data-fixed-element
      >
        <div className="container px-0 px-xl-3">
          <button
            className="navbar-toggler ms-n2 me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#primaryMenu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a
            className="navbar-brand flex-shrink-0 order-lg-1 mx-auto ms-lg-0 pe-lg-2 me-lg-4"
            href="index.html"
          >
            {/* <img
              className="d-none d-lg-block"
              src="img/logo/logo-dark.png"
              alt="Around"
              width="153"
            />
            <img
              className="d-lg-none"
              src="img/logo/logo-icon.png"
              alt="Around"
              width="58"
            /> */}
            WCTB
          </a>
          <div
            className="offcanvas offcanvas-collapse order-lg-2"
            id="primaryMenu"
          >
            <div className="offcanvas-header navbar-shadow">
              <h5 className="mt-1 mb-0">Menu</h5>
              <button
                className="btn-close lead"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-dark bg-size-cover overflow-hidden pt-5 pt-md-6 pt-lg-7 pb-5">
        <div className="container position-relative zindex-5 pt-2 pb-4 pb-md-2">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-8 text-center">
              <h1 className="display-4 text-light mb-1">World Classicals</h1>
              <h1 className="display-5 text-light mb-5">Team Battle</h1>
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <i className="ai-calendar h2 mb-0 me-2 text-light" />
                <span className="text-light">September 11-13, 2020</span>
              </div>
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <i className="ai-map-pin h2 mb-0 me-2 text-light" />
                <span className="text-light">Lichess</span>
              </div>
              <div className="pt-2">
                <a className="btn btn-success" href="#tickets" data-scroll>
                  Buy Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-jarallax-element="50" data-disable-parallax-down="md">
          {/* <img
            className="d-block mx-auto"
            src="img/demo/event-landing/people.png"
            alt="People"
          /> */}
        </div>
      </section>

      <section className="bg-secondary py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <div className="col-xl-4 text-center text-xl-start">
              <h2 className="mb-4 mb-xl-0">
                New weekly tournament will start in:
              </h2>
            </div>
            <div className="col-xl-8">
              <div
                className="countdown h2 display-2 justify-content-center justify-content-xl-start"
                data-countdown="10/01/2021 07:00:00 PM"
              >
                <div className="countdown-days mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Days</span>
                </div>
                <div className="countdown-hours mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Hours</span>
                </div>
                <div className="countdown-minutes mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Mins</span>
                </div>
                <div className="countdown-seconds mb-0 mt-3 me-0 px-4">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
