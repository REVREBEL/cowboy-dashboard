"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import DOM from "./webflow_modules/Builtin/components/DOM";
import HtmlEmbed from "./webflow_modules/Embed/components/HtmlEmbed";

export function AvailabilityStarter({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"date-input"} data-booking-starter={""} tag={"div"}>
        <HtmlEmbed
          className={"code-embed"}
          content={
            "<script>\n(function () {\n  const BOOKING_ENGINE_URL = 'https://YOUR-BOOKING-ENGINE-URL.com/';\n  const MIN_ADULTS = 1;\n  const MAX_ADULTS = 10;\n\n  function addDays(date, days) {\n    const result = new Date(date);\n    result.setDate(result.getDate() + days);\n    return result;\n  }\n\n  function initBookingStarters() {\n    document.querySelectorAll('[data-booking-starter]').forEach(function (root) {\n      if (root.dataset.bookingInitialized === 'true') return;\n\n      if (typeof flatpickr !== 'function') {\n        console.error('[Availability Starter] Flatpickr is not loaded.');\n        return;\n      }\n\n      const calendarInput = root.querySelector('[data-booking-calendar]');\n      const arrivalInput = root.querySelector('[data-arrival]');\n      const departureInput = root.querySelector('[data-departure]');\n      const adultsInput = root.querySelector('[data-adults]');\n\n      const arrivalDay = root.querySelector('[data-arrival-day]');\n      const arrivalMonth = root.querySelector('[data-arrival-month]');\n      const departureDay = root.querySelector('[data-departure-day]');\n      const departureMonth = root.querySelector('[data-departure-month]');\n\n      const dateTriggers = root.querySelectorAll('button[data-date-trigger]');\n      const guestsTrigger = root.querySelector('button[data-guests-trigger]');\n      const guestsPopover = root.querySelector('[data-guests-popover]');\n      const adultsMinus = root.querySelector('button[data-adults-minus]');\n      const adultsPlus = root.querySelector('button[data-adults-plus]');\n      const adultsCounts = root.querySelectorAll('[data-adults-count]');\n      const adultsLabel = root.querySelector('[data-adults-label]');\n      const bookingSubmit = root.querySelector('button[data-booking-submit]');\n\n      if (\n        !calendarInput ||\n        !arrivalInput ||\n        !departureInput ||\n        !adultsInput ||\n        !arrivalDay ||\n        !arrivalMonth ||\n        !departureDay ||\n        !departureMonth ||\n        !dateTriggers.length ||\n        !guestsTrigger ||\n        !guestsPopover ||\n        !adultsMinus ||\n        !adultsPlus ||\n        !bookingSubmit\n      ) {\n        console.warn('[Availability Starter] Required element missing.', root);\n        return;\n      }\n\n      root.querySelectorAll('button').forEach(function (button) {\n        button.type = 'button';\n      });\n\n      const today = new Date();\n      today.setHours(12, 0, 0, 0);\n\n      const defaultArrival = addDays(today, 7);\n      const defaultDeparture = addDays(defaultArrival, 2);\n\n      let adults = Number.parseInt(adultsInput.value, 10);\n      if (!Number.isFinite(adults)) adults = 2;\n      adults = Math.min(MAX_ADULTS, Math.max(MIN_ADULTS, adults));\n\n      function renderAdults() {\n        adultsInput.value = String(adults);\n\n        adultsCounts.forEach(function (element) {\n          element.textContent = String(adults);\n        });\n\n        if (adultsLabel) {\n          adultsLabel.textContent = adults === 1 ? 'Adult' : 'Adults';\n        }\n\n        adultsMinus.disabled = adults <= MIN_ADULTS;\n        adultsPlus.disabled = adults >= MAX_ADULTS;\n      }\n\n      function setGuestsOpen(open) {\n        guestsPopover.style.setProperty(\n          'display',\n          open ? 'flex' : 'none',\n          'important'\n        );\n\n        guestsTrigger.setAttribute('aria-expanded', String(open));\n      }\n\n      function closeGuests() {\n        setGuestsOpen(false);\n      }\n\n      function toggleGuests() {\n        const isOpen =\n          guestsTrigger.getAttribute('aria-expanded') === 'true';\n\n        setGuestsOpen(!isOpen);\n      }\n\n      function renderArrival(date, instance) {\n        arrivalDay.textContent = instance.formatDate(date, 'd');\n        arrivalMonth.textContent = instance.formatDate(date, 'F');\n      }\n\n      function renderDeparture(date, instance) {\n        departureDay.textContent = instance.formatDate(date, 'd');\n        departureMonth.textContent = instance.formatDate(date, 'F');\n      }\n\n      const mobileCalendar =\n        window.matchMedia('(max-width: 767px)');\n\n      const initialDates =\n        arrivalInput.value && departureInput.value\n          ? [arrivalInput.value, departureInput.value]\n          : [defaultArrival, defaultDeparture];\n\n      const flatpickrInstance = flatpickr(calendarInput, {\n        mode: 'range',\n        minDate: 'today',\n        dateFormat: 'Y-m-d',\n        defaultDate: initialDates,\n        showMonths: mobileCalendar.matches ? 1 : 2,\n        clickOpens: false,\n        allowInput: false,\n        disableMobile: true,\n        positionElement: dateTriggers[0],\n\n        onChange: function (selectedDates, dateString, instance) {\n          if (selectedDates[0]) {\n            arrivalInput.value =\n              instance.formatDate(selectedDates[0], 'Y-m-d');\n\n            renderArrival(selectedDates[0], instance);\n          }\n\n          if (selectedDates[1]) {\n            departureInput.value =\n              instance.formatDate(selectedDates[1], 'Y-m-d');\n\n            renderDeparture(selectedDates[1], instance);\n          } else {\n            departureInput.value = '';\n          }\n        }\n      });\n\n      const initialSelectedDates =\n        flatpickrInstance.selectedDates;\n\n      if (initialSelectedDates[0]) {\n        arrivalInput.value =\n          flatpickrInstance.formatDate(\n            initialSelectedDates[0],\n            'Y-m-d'\n          );\n\n        renderArrival(\n          initialSelectedDates[0],\n          flatpickrInstance\n        );\n      }\n\n      if (initialSelectedDates[1]) {\n        departureInput.value =\n          flatpickrInstance.formatDate(\n            initialSelectedDates[1],\n            'Y-m-d'\n          );\n\n        renderDeparture(\n          initialSelectedDates[1],\n          flatpickrInstance\n        );\n      }\n\n      dateTriggers.forEach(function (trigger) {\n        trigger.setAttribute('aria-haspopup', 'dialog');\n\n        trigger.addEventListener('click', function () {\n          closeGuests();\n          flatpickrInstance.open();\n        });\n      });\n\n      guestsTrigger.setAttribute('aria-haspopup', 'dialog');\n      guestsTrigger.setAttribute('aria-expanded', 'false');\n      closeGuests();\n\n      guestsTrigger.addEventListener('click', function (event) {\n        event.preventDefault();\n        event.stopPropagation();\n\n        flatpickrInstance.close();\n        toggleGuests();\n      });\n\n      guestsPopover.addEventListener('click', function (event) {\n        event.stopPropagation();\n      });\n\n      adultsPlus.addEventListener('click', function (event) {\n        event.preventDefault();\n        event.stopPropagation();\n\n        adults = Math.min(MAX_ADULTS, adults + 1);\n        renderAdults();\n      });\n\n      adultsMinus.addEventListener('click', function (event) {\n        event.preventDefault();\n        event.stopPropagation();\n\n        adults = Math.max(MIN_ADULTS, adults - 1);\n        renderAdults();\n      });\n\n      document.addEventListener('click', function (event) {\n        const isOpen =\n          guestsTrigger.getAttribute('aria-expanded') === 'true';\n\n        if (\n          isOpen &&\n          !guestsPopover.contains(event.target) &&\n          !guestsTrigger.contains(event.target)\n        ) {\n          closeGuests();\n        }\n      });\n\n      document.addEventListener('keydown', function (event) {\n        if (event.key !== 'Escape') return;\n\n        closeGuests();\n        flatpickrInstance.close();\n      });\n\n      function updateCalendarMonths() {\n        flatpickrInstance.set(\n          'showMonths',\n          mobileCalendar.matches ? 1 : 2\n        );\n      }\n\n      if (mobileCalendar.addEventListener) {\n        mobileCalendar.addEventListener(\n          'change',\n          updateCalendarMonths\n        );\n      }\n\n      bookingSubmit.addEventListener('click', function () {\n        const arrival = arrivalInput.value;\n        const departure = departureInput.value;\n\n        if (!arrival || !departure) {\n          closeGuests();\n          flatpickrInstance.open();\n          return;\n        }\n\n        const url = new URL(\n          BOOKING_ENGINE_URL,\n          window.location.href\n        );\n\n        url.searchParams.set('arrival', arrival);\n        url.searchParams.set('departure', departure);\n        url.searchParams.set('adults', String(adults));\n\n        window.location.assign(url.toString());\n      });\n\n      renderAdults();\n      root.dataset.bookingInitialized = 'true';\n    });\n  }\n\n  window.Webflow = window.Webflow || [];\n  window.Webflow.push(initBookingStarters);\n})();\n</script>"
          }
        />
        <HtmlEmbed
          content={
            '<input\n  type="text"\n  data-booking-calendar\n  autocomplete="off"\n  tabindex="-1"\n  aria-hidden="true"\n  style="\n    position:absolute;\n    width:1px;\n    height:1px;\n    opacity:0;\n    pointer-events:none;\n  "\n>\n\n<input type="hidden" data-arrival name="arrival">\n<input type="hidden" data-departure name="departure">\n<input type="hidden" data-adults name="adults" value="2">'
          }
        />
        <Block className={"date-header"} tag={"div"}>
          <Block
            className={"label is-alpine-linen"}
            id={"w-node-_6bc8dbf3-3a5e-f468-75b0-327b7ee850dc-7ee850d8"}
            tag={"div"}
          >
            {"Arrival"}
          </Block>
          <Block
            className={" label is-alpine-linen"}
            id={"w-node-_6bc8dbf3-3a5e-f468-75b0-327b7ee850de-7ee850d8"}
            tag={"div"}
          >
            {"Departure"}
          </Block>
        </Block>
        <Block className={"date-wrapper"} tag={"div"}>
          <DOM
            className={"button_arrival-date"}
            data-date-trigger={""}
            tag={"button"}
          >
            <Block className={"check-in"} data-arrival-day={""} tag={"div"}>
              {"30"}
            </Block>
            <Block
              className={"check-out_month"}
              data-arrival-month={""}
              tag={"div"}
            >
              {"September"}
            </Block>
          </DOM>
          <DOM
            className={"button_departure-date"}
            data-date-trigger={""}
            tag={"button"}
          >
            <Block className={" check-out"} data-departure-day={""} tag={"div"}>
              {"01"}
            </Block>
            <Block
              className={" check-out_month"}
              data-departure-month={""}
              tag={"div"}
            >
              {"October"}
            </Block>
          </DOM>
        </Block>
        <DOM
          className={"button_guest-count"}
          data-guests-trigger={""}
          tag={"button"}
        >
          <Block className={"guest-count-wrapper"} tag={"div"}>
            <Block className={"guest-count"} data-adults-count={""} tag={"div"}>
              {"2"}
            </Block>
            <Block className={"guest-label"} data-adults-label={""} tag={"div"}>
              {"Adults "}
            </Block>
          </Block>
        </DOM>
        <DOM
          className={"button_guest-count is-popover"}
          data-guests-popover={""}
          tag={"div"}
        >
          <DOM className={"plus-toggle"} data-adults-plus={""} tag={"button"}>
            <Block className={"plus-button"} tag={"div"} />
          </DOM>
          <Block className={"guest-count-wrapper"} tag={"div"}>
            <Block
              className={"guest-count is-popover"}
              data-adults-count={""}
              tag={"div"}
            >
              {"2"}
            </Block>
          </Block>
          <DOM className={"minus-toggle"} data-adults-minus={""} tag={"button"}>
            <Block className={"minus-button"} tag={"div"} />
          </DOM>
        </DOM>
        <DOM className={"date-footer"} data-booking-submit={""} tag={"button"}>
          <Block className={"label is-alpine-linen"} tag={"div"}>
            {"Check Availabilty"}
          </Block>
        </DOM>
      </Block>
    </div>
  );
}
