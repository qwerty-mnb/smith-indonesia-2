<template>
  <div class="topbar-container" bis_skin_checked="1">
  <div class="container" bis_skin_checked="1">
    <div class="row" bis_skin_checked="1">
      <div class="topbar-left-container" bis_skin_checked="1">
        <div class="topbar-left-section" bis_skin_checked="1">
          <div class="topbar-item" bis_skin_checked="1">
            <span class="js_live_chat_link live-chat">
              <i
                data-icon="live-chat"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/live-chat.svg?v=20250529);
                "
              ></i>
            </span>
          </div>
          <div class="topbar-item" bis_skin_checked="1">
            <a
              href="https://apk-bank.s3.ap-southeast-1.amazonaws.com/bd303.apk"
              class="download-apk-btn"
            >
              <i
                data-icon="android"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/icons/android-logo.svg?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="topbar-item" bis_skin_checked="1">
            <a href="/mobile/home" rel="nofollow">
              <i
                data-icon="contact-us"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/mobile.svg?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div
            class="topbar-item language-selector-container"
            style="
              --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/flags.png?v=20250529);
            "
            bis_skin_checked="1"
          >
            <div
              id="language_selector_trigger"
              data-toggle="dropdown"
              class="language-selector-trigger"
              data-language="id"
              bis_skin_checked="1"
            >
              <i data-language="id"></i>
            </div>
            <ul class="dropdown-menu language-selector">
              <li class="language_selector" data-language="en">
                <i data-language="en"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">ENGLISH</div>
                  <div bis_skin_checked="1">ENGLISH</div>
                </div>
              </li>
              <li class="language_selector" data-language="id">
                <i data-language="id"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">BHS INDONESIA</div>
                  <div bis_skin_checked="1">INDONESIAN</div>
                </div>
              </li>
              <li class="language_selector" data-language="kr">
                <i data-language="kr"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">한국어</div>
                  <div bis_skin_checked="1">KOREAN</div>
                </div>
              </li>
              <li class="language_selector" data-language="cn">
                <i data-language="cn"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">中文</div>
                  <div bis_skin_checked="1">CHINESE</div>
                </div>
              </li>
              <li class="language_selector" data-language="jp">
                <i data-language="jp"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">日本語</div>
                  <div bis_skin_checked="1">JAPANESE</div>
                </div>
              </li>
              <li class="language_selector" data-language="th">
                <i data-language="th"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">ไทย</div>
                  <div bis_skin_checked="1">THAI</div>
                </div>
              </li>
              <li class="language_selector" data-language="my">
                <i data-language="my"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">မြန်မာစာ</div>
                  <div bis_skin_checked="1">BURMESE</div>
                </div>
              </li>
              <li class="language_selector" data-language="kh">
                <i data-language="kh"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">ខេមរភាសា</div>
                  <div bis_skin_checked="1">KHMER</div>
                </div>
              </li>
              <li class="language_selector" data-language="hi">
                <i data-language="hi"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">हिन्दी</div>
                  <div bis_skin_checked="1">HINDI</div>
                </div>
              </li>
              <li class="language_selector" data-language="ta">
                <i data-language="ta"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">தமிழ்</div>
                  <div bis_skin_checked="1">TAMIL</div>
                </div>
              </li>
              <li class="language_selector" data-language="te">
                <i data-language="te"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">తెలుగు</div>
                  <div bis_skin_checked="1">TELUGU</div>
                </div>
              </li>
              <li class="language_selector" data-language="vi">
                <i data-language="vi"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">Tiếng Việt</div>
                  <div bis_skin_checked="1">VIETNAMESE</div>
                </div>
              </li>
              <li class="language_selector" data-language="bn">
                <i data-language="bn"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">বাংলাদেশী</div>
                  <div bis_skin_checked="1">BENGALI</div>
                </div>
              </li>
              <li class="language_selector" data-language="pt">
                <i data-language="pt"></i>
                <div class="language-name" bis_skin_checked="1">
                  <div bis_skin_checked="1">Português</div>
                  <div bis_skin_checked="1">PORTUGESE</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="topbar-item" bis_skin_checked="1">
            <a href="#" class="search_popup_button">
              <i
                data-icon="search"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/search.svg?v=20250529);
                "
              ></i>
            </a>
          </div>
        </div>
      </div>
      <div class="topbar-right-container" bis_skin_checked="1">
        <div class="user-info" id="user_info" bis_skin_checked="1">
          <div class="user-main-info" bis_skin_checked="1">
            <div
              class="user-info-item"
              id="loyalty_level_container"
              bis_skin_checked="1"
            >
              <div
                class="user-info-loyalty-xp"
                id="loyalty_point_section"
                bis_skin_checked="1"
              >
                <a href="/desktop/loyalty/benefits">
                  <img
                    alt="Diamond"
                    class="loyalty_level"
                    data-image-path="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/"
                    loading="lazy"
                    src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/diamond.svg"
                  />
                  <div class="username-container" bis_skin_checked="1">
                    <span>kenzo</span>
                    <div
                      class="loyalty-xp-progress"
                      id="loyalty_experience"
                      bis_skin_checked="1"
                    >
                      <div
                        class="progress loyalty_experience_progress"
                        style="width: 89%"
                        bis_skin_checked="1"
                      ></div>
                    </div>
                    <div class="loyalty-xp-detail" bis_skin_checked="1">
                      <span id="loyalty_xp">44,929,564</span> /
                      <span id="loyalty_next_level_xp">50,000,000</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div
              class="user-info-item wallet-container"
              id="wallet_container"
              data-locked-balance="false"
              bis_skin_checked="1"
            >
              <div class="user-info-item" bis_skin_checked="1">
                <button title="Refresh" class="refresh_balance" data-loading="false">
                  <i
                    class="user-info-icon"
                    data-icon="refresh"
                    style="
                      background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/refresh.png?v=20250529);
                    "
                  ></i>
                </button>
              </div>
              <div class="balance" bis_skin_checked="1">
                <a href="#" data-toggle="dropdown">
                  IDR
                  <span class="total_balance">352,514.40</span>
                </a>
                <div
                  class="dropdown-menu vendor-balances-container"
                  bis_skin_checked="1"
                >
                  <div class="vendor-balances-header" bis_skin_checked="1">
                    <div bis_skin_checked="1">SALDO KREDIT</div>
                    <div bis_skin_checked="1">352,514.40</div>
                  </div>
                  <div class="vendor-balances-content" bis_skin_checked="1">
                    <div bis_skin_checked="1">
                      <strong>Slots</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Pragmatic Play</div>
                          <div data-vendor-game-code="7" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">PG Soft</div>
                          <div data-vendor-game-code="9" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Slot88 x PP</div>
                          <div data-vendor-game-code="40" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fat Panda</div>
                          <div data-vendor-game-code="112" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">No Limit City</div>
                          <div data-vendor-game-code="92" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Jili</div>
                          <div data-vendor-game-code="70" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Habanero</div>
                          <div data-vendor-game-code="16" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">MicroGaming</div>
                          <div data-vendor-game-code="17" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">5GG</div>
                          <div data-vendor-game-code="114" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Spade Gaming</div>
                          <div data-vendor-game-code="29" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fast Spin</div>
                          <div data-vendor-game-code="110" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Joker</div>
                          <div data-vendor-game-code="6" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fachai</div>
                          <div data-vendor-game-code="72" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AdvantPlay</div>
                          <div data-vendor-game-code="54" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Naga Games</div>
                          <div data-vendor-game-code="87" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">JDB</div>
                          <div data-vendor-game-code="51" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Playstar</div>
                          <div data-vendor-game-code="65" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Spinix</div>
                          <div data-vendor-game-code="91" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Crowd Play</div>
                          <div data-vendor-game-code="73" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Bigpot</div>
                          <div data-vendor-game-code="75" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">VPower</div>
                          <div data-vendor-game-code="77" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">ION Slot</div>
                          <div data-vendor-game-code="50" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Worldmatch</div>
                          <div data-vendor-game-code="89" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AMB Slot</div>
                          <div data-vendor-game-code="61" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Octoplay</div>
                          <div data-vendor-game-code="109" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Mario Club</div>
                          <div data-vendor-game-code="80" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Dragoonsoft</div>
                          <div data-vendor-game-code="81" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fun Gaming</div>
                          <div data-vendor-game-code="79" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Funky Games</div>
                          <div data-vendor-game-code="35" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Live22</div>
                          <div data-vendor-game-code="45" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">CQ9</div>
                          <div data-vendor-game-code="13" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Netent</div>
                          <div data-vendor-game-code="94" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Big Time Gaming</div>
                          <div data-vendor-game-code="95" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Red Tiger</div>
                          <div data-vendor-game-code="93" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Skywind</div>
                          <div data-vendor-game-code="90" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Yggdrasil</div>
                          <div data-vendor-game-code="42" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Play'n Go</div>
                          <div data-vendor-game-code="18" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Live Casino</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">PP Casino</div>
                          <div data-vendor-game-code="41" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">MG Live</div>
                          <div data-vendor-game-code="66" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Evo Gaming</div>
                          <div data-vendor-game-code="38" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Ping Pong</div>
                          <div data-vendor-game-code="105" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Sexy Baccarat</div>
                          <div data-vendor-game-code="27" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Pretty Gaming</div>
                          <div data-vendor-game-code="39" bis_skin_checked="1">
                            352,000.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Oriental Gaming</div>
                          <div data-vendor-game-code="100" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AllBet</div>
                          <div data-vendor-game-code="44" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">SA Gaming</div>
                          <div data-vendor-game-code="84" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Ebet</div>
                          <div data-vendor-game-code="85" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Dream Gaming</div>
                          <div data-vendor-game-code="43" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">568Win Casino</div>
                          <div data-vendor-game-code="10" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Togel</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Nex4D</div>
                          <div data-vendor-game-code="48" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Olahraga</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">SBO Sportsbook</div>
                          <div data-vendor-game-code="5" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Saba Sportsbook</div>
                          <div data-vendor-game-code="23" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">WBet</div>
                          <div data-vendor-game-code="69" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">CMD</div>
                          <div data-vendor-game-code="83" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Opus</div>
                          <div data-vendor-game-code="71" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">IM Sportsbook</div>
                          <div data-vendor-game-code="86" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">UMbet</div>
                          <div data-vendor-game-code="102" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fairbet</div>
                          <div data-vendor-game-code="103" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">SBO Virtual Sports</div>
                          <div data-vendor-game-code="11" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">PPVIRTUALGAMES</div>
                          <div data-vendor-game-code="55" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Crash Game</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">PP Casino</div>
                          <div data-vendor-game-code="41" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Aviator</div>
                          <div data-vendor-game-code="82" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">MicroGaming</div>
                          <div data-vendor-game-code="17" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Spinix</div>
                          <div data-vendor-game-code="91" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Gemini</div>
                          <div data-vendor-game-code="107" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AdvantPlay Mini Game</div>
                          <div data-vendor-game-code="62" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Joker</div>
                          <div data-vendor-game-code="6" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Dragoonsoft</div>
                          <div data-vendor-game-code="81" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Funky Games</div>
                          <div data-vendor-game-code="35" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Arcade</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">MicroGaming</div>
                          <div data-vendor-game-code="17" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Aviator</div>
                          <div data-vendor-game-code="82" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Jili</div>
                          <div data-vendor-game-code="70" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Gemini</div>
                          <div data-vendor-game-code="107" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fachai</div>
                          <div data-vendor-game-code="72" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Joker</div>
                          <div data-vendor-game-code="6" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Spinix</div>
                          <div data-vendor-game-code="91" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AMB Slot</div>
                          <div data-vendor-game-code="61" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Crowd Play</div>
                          <div data-vendor-game-code="73" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">VPower</div>
                          <div data-vendor-game-code="77" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Worldmatch</div>
                          <div data-vendor-game-code="89" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Mario Club</div>
                          <div data-vendor-game-code="80" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Dragoonsoft</div>
                          <div data-vendor-game-code="81" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">CQ9</div>
                          <div data-vendor-game-code="13" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Fun Gaming</div>
                          <div data-vendor-game-code="79" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">MM Tangkas</div>
                          <div data-vendor-game-code="96" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Skywind</div>
                          <div data-vendor-game-code="90" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">AdvantPlay Mini Game</div>
                          <div data-vendor-game-code="62" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">JDB</div>
                          <div data-vendor-game-code="51" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Funky Games</div>
                          <div data-vendor-game-code="35" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Poker</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">Balak Play</div>
                          <div data-vendor-game-code="24" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">9Gaming</div>
                          <div data-vendor-game-code="32" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>E-Sports</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">TF Gaming</div>
                          <div data-vendor-game-code="58" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div bis_skin_checked="1">
                      <strong>Sabung Ayam</strong>
                      <div class="vendor-balance-item" bis_skin_checked="1">
                        <div bis_skin_checked="1">
                          <div bis_skin_checked="1">SV388</div>
                          <div data-vendor-game-code="57" bis_skin_checked="1">
                            0.00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="locked-balance locked_balance_container"
                hidden=""
                bis_skin_checked="1"
              >
                <i class="user-info-icon" data-icon="locked-balance"
                  ><img
                    alt="Lock Balance"
                    loading="lazy"
                    src="//d2rzzcn1jnr24x.cloudfront.net/Images/icons/wallet/lock-balance.svg?v=20250529"
                /></i>
                IDR
                <span class="total_locked_balance">0.00</span>
              </div>
            </div>
            <div class="user-info-item" id="loyalty_point_info" bis_skin_checked="1">
              <a href="/desktop/loyalty/rewards" class="user-info-loyalty-point">
                <div class="lp-label" bis_skin_checked="1">LP</div>
                <span class="loyalty_point">129,727,653</span>
              </a>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <button type="button">
                <i
                  class="user-info-icon daily_reward_button"
                  data-icon="daily-reward"
                  data-platform="Desktop"
                  data-daily-reward-available="true"
                  style="
                    --chest-claimed-background: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/chest-claimed.webp?v=20250529);
                    --chest-available-background: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/chest-available.webp?v=20250529);
                  "
                ></i>
              </button>
            </div>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a href="/desktop/account-summary">
              <i
                class="user-info-icon"
                data-icon="profile"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/profile.png?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a href="/desktop/deposit">
              <i
                class="user-info-icon"
                data-icon="wallet"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bank-account.png?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="user-info-item" id="redemption_store_link" bis_skin_checked="1">
            <a href="/loyalty/redemption-store" target="_blank">
              <i
                class="user-info-icon"
                data-icon="redemption-store"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/redemption-store.png?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a href="/desktop/bonus">
              <i
                class="user-info-icon"
                data-icon="wallet"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bonus.png?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a href="/desktop/messages/inbox" data-new-notification="false">
              <i
                class="user-info-icon"
                data-icon="notification"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/notification.png?v=20250529);
                "
              ></i>
            </a>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a
              href="#"
              data-new-announcement="true"
              data-announcement-count="5"
              id="unread_announcements_button"
            >
              <i
                class="user-info-icon"
                data-icon="announcement"
                style="
                  background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bell.svg?v=20250529);
                "
              ></i>
            </a>
            <div
              class="unread-announcements-popup"
              id="unread_announcements_popup"
              bis_skin_checked="1"
            >
              <div class="loader" id="loader" bis_skin_checked="1"></div>
              <iframe
                data-src="/desktop/message/unread-announcements"
                src="about:blank"
              ></iframe>
            </div>
            <div
              class="unread-announcements-popup-overlay"
              id="unread_announcements_popup_overlay"
              bis_skin_checked="1"
            ></div>
          </div>
          <div class="user-info-item" bis_skin_checked="1">
            <a
              href="#"
              onclick="window.closeWindows(); document.querySelector('#logout-form').submit();"
              class="btn-logout"
            >
              <form action="/Account/Logout" id="logout-form" method="post">
                <i
                  data-icon="logout"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/icons/logout.svg?v=20250529);
                  "
                ></i>
              </form>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopBar",
  setup() {
    // Component logic here
    return {};
  },
});
</script>
