import ColorPicker from "@/components/ColorPicker";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Color Picker
        </h1>
        <p className="text-gray-500 text-sm max-w-md">
          Select any color, adjust the alpha channel, and grab the hex or RGBA
          values for your project.
        </p>
      </div>
      <ColorPicker />
    </main>
  );
}
