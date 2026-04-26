let activeRoutes = [];
let history = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { driver, route, action } = req.body;

    const entry = {
      driver,
      route,
      time: new Date().toLocaleTimeString()
    };

    if (action === "start") {
      activeRoutes.push(entry);
    }

    if (action === "end") {
      activeRoutes = activeRoutes.filter(
        (r) => !(r.driver === driver && r.route === route)
      );

      history.push({ ...entry, action: "ended" });
    }

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      active: activeRoutes,
      history
    });
  }

  res.status(405).json({ error: "Method not allowed" });
}
