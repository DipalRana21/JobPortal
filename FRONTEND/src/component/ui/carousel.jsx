import * as React from "react"
import { cn } from "../../lib/utils"; // Correct relative path

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import useEmblaCarousel from "embla-carousel-react"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi)
      emblaApi.on("select", onSelect)
      emblaApi.on("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        emblaApi,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={emblaRef}
        className={cn(
          "relative",
          className
        )}
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex",
      className
    )}
    {...props} />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-0 shrink-0 grow-0 basis-full",
      className
    )}
    {...props} />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2",
        className
      )}
      {...props}>
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2",
        className
      )}
      {...props}>
      <ArrowRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}